export const aStar = async (startNode, targetNode, logEvent) => {
  const openSet = new Set([startNode]);
  const cameFrom = new Map();
  const gScore = { [startNode]: 0 };
  const fScore = { [startNode]: heuristic(startNode, targetNode) };

  logEvent(`Starting A* Algorithm from Node: ${startNode} to Node: ${targetNode}`);

  while (openSet.size > 0) {
    // Find node in openSet with the lowest fScore
    const current = [...openSet].reduce((lowest, node) =>
      fScore[node] < fScore[lowest] ? node : lowest
    );

    if (current === targetNode) {
      logEvent(`Path Found to Target Node: ${targetNode}`);
      return reconstructPath(cameFrom, current);
    }

    openSet.delete(current);
    logEvent(`Exploring Node: ${current}`);

    // Assuming neighbors are accessible as `node.neighbors` with weights
    for (const [neighbor, weight] of current.neighbors || []) {
      const tentativeGScore = gScore[current] + weight;

      if (tentativeGScore < (gScore[neighbor] || Infinity)) {
        cameFrom.set(neighbor, current);
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = tentativeGScore + heuristic(neighbor, targetNode);
        logEvent(`Updated Scores for Node: ${neighbor}, gScore: ${gScore[neighbor]}, fScore: ${fScore[neighbor]}`);

        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
          logEvent(`Added Node: ${neighbor} to Open Set`);
        }
      }
    }
  }

  logEvent("No Path Found.");
  return [];
};

// Helper function to calculate heuristic (e.g., Manhattan Distance)
const heuristic = (node, target) => {
  // Replace with your heuristic logic
  return Math.abs(node.x - target.x) + Math.abs(node.y - target.y);
};

// Helper function to reconstruct path
const reconstructPath = (cameFrom, current) => {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    path.unshift(current);
  }
  return path;
};
