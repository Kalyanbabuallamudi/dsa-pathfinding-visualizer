export const dijkstra = async (startNode, logEvent) => {
  const distances = {};
  const visited = new Set();
  const queue = [];

  // Initialize distances
  distances[startNode] = 0;
  queue.push({ node: startNode, distance: 0 });

  logEvent(`Starting Dijkstra's Algorithm from Node: ${startNode}`);

  while (queue.length > 0) {
    // Sort queue by distance and dequeue the closest node
    queue.sort((a, b) => a.distance - b.distance);
    const { node } = queue.shift();

    if (!visited.has(node)) {
      visited.add(node);
      logEvent(`Visited Node: ${node}, Distance: ${distances[node]}`);

      // Assuming neighbors are accessible as `node.neighbors` with weights
      for (const [neighbor, weight] of node.neighbors || []) {
        const newDistance = distances[node] + weight;
        if (newDistance < (distances[neighbor] || Infinity)) {
          distances[neighbor] = newDistance;
          queue.push({ node: neighbor, distance: newDistance });
          logEvent(`Updated Distance for Node: ${neighbor} to ${newDistance}`);
        }
      }
    }
  }

  logEvent(`Dijkstra's Algorithm Completed. Distances: ${JSON.stringify(distances)}`);
  return distances;
};
