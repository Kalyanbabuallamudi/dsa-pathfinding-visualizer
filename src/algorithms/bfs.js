export const bfs = async (startNode, logEvent) => {
  const visited = new Set();
  const queue = [startNode];

  logEvent(`Starting BFS from Node: ${startNode}`);
  while (queue.length > 0) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      logEvent(`Visited Node: ${node}`);

      // Assuming neighbors are accessible as `node.neighbors`
      for (const neighbor of node.neighbors || []) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          logEvent(`Queued Neighbor: ${neighbor}`);
        }
      }
    }
  }

  logEvent(`BFS Completed. Visited Nodes: ${Array.from(visited).join(", ")}`);
  return Array.from(visited);
};
