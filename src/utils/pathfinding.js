export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const bfs = async (grid, startNode, endNode) => {
  const queue = [startNode];
  const visitedNodesInOrder = [];

  while (queue.length) {
    const currentNode = queue.shift();
    if (currentNode === endNode) break;

    for (const neighbor of getNeighbors(grid, currentNode)) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.isVisited = true;
        queue.push(neighbor);
        visitedNodesInOrder.push(neighbor);
        await sleep(2);
      }
    }
  }

  return visitedNodesInOrder;
};

export const dfs = async (grid, startNode, endNode) => {
  const stack = [startNode];
  const visitedNodesInOrder = [];

  while (stack.length) {
    const currentNode = stack.pop();
    if (currentNode === endNode) break;

    if (!currentNode.isVisited) {
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);

      for (const neighbor of getNeighbors(grid, currentNode)) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          stack.push(neighbor);
          await sleep(2);
        }
      }
    }
  }

  return visitedNodesInOrder;
};

export const dijkstra = async (grid, startNode, endNode) => {
  const nodesToVisit = [startNode];
  const visitedNodesInOrder = [];
  startNode.distance = 0;

  while (nodesToVisit.length) {
    const closestNode = nodesToVisit.shift();
    if (closestNode.isVisited) continue;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    for (const neighbor of getNeighbors(grid, closestNode)) {
      if (!neighbor.isWall && neighbor.distance > closestNode.distance + 1) {
        neighbor.distance = closestNode.distance + 1;
        nodesToVisit.push(neighbor);
        await sleep(2);
      }
    }
  }

  return visitedNodesInOrder;
};

export const aStar = async (grid, startNode, endNode) => {
  const openSet = [startNode];
  const closedSet = [];
  const visitedNodesInOrder = [];

  while (openSet.length) {
    let currentNode = openSet[0];
    for (let i = 1; i < openSet.length; i++) {
      if (openSet[i].f < currentNode.f) currentNode = openSet[i];
    }

    if (currentNode === endNode) break;

    openSet.splice(openSet.indexOf(currentNode), 1);
    closedSet.push(currentNode);

    for (const neighbor of getNeighbors(grid, currentNode)) {
      if (!neighbor.isWall && !closedSet.includes(neighbor)) {
        neighbor.g = currentNode.g + 1;
        neighbor.f = neighbor.g + heuristic(neighbor, endNode);
        if (!openSet.includes(neighbor)) openSet.push(neighbor);

        visitedNodesInOrder.push(neighbor);
        await sleep(2);
      }
    }
  }

  return visitedNodesInOrder;
};

export const getNeighbors = (grid, node) => {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
};

export const heuristic = (node, endNode) => {
  return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
};
