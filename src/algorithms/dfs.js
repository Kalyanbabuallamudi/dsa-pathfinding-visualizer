export const dfs = async (startNode, logEvent) => {
  const visited = new Set();

  const dfsHelper = (node) => {
    if (!visited.has(node)) {
      visited.add(node);
      logEvent(`Visited Node: ${node}`);

      // Assuming neighbors are accessible as `node.neighbors`
      for (const neighbor of node.neighbors || []) {
        dfsHelper(neighbor);
      }
    }
  };

  logEvent(`Starting DFS from Node: ${startNode}`);
  dfsHelper(startNode);
  logEvent(`DFS Completed. Visited Nodes: ${Array.from(visited).join(", ")}`);
  return Array.from(visited);
};
