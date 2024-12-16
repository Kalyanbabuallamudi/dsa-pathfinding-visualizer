import { treeNodes } from "./treeGraph";

// Breadth-First Search (BFS)
export const bfs = async (startNode, logEvent) => {
  const queue = [startNode];
  const visited = new Set();

  logEvent(`Starting BFS from Node: ${startNode}`);
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (visited.has(currentNode)) continue;

    logEvent(`Visited Node: ${currentNode}`);
    visited.add(currentNode);

    for (let child of treeNodes[currentNode].children) {
      if (!visited.has(child)) {
        queue.push(child);
        logEvent(`Queued Node: ${child}`);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate animation delay
  }

  logEvent(`BFS Complete. Visited Nodes: ${Array.from(visited).join(", ")}`);
  return Array.from(visited);
};

// Depth-First Search (DFS)
export const dfs = async (startNode, logEvent, visited = new Set()) => {
  if (visited.has(startNode)) return;

  logEvent(`Visiting Node: ${startNode}`);
  visited.add(startNode);

  for (let child of treeNodes[startNode].children) {
    if (!visited.has(child)) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate animation delay
      await dfs(child, logEvent, visited);
    }
  }

  logEvent(`DFS Completed for Subtree Rooted at: ${startNode}`);
  return Array.from(visited);
};

// Dijkstra's Algorithm
export const dijkstra = async (startNode, logEvent) => {
  const distances = {};
  const visited = new Set();
  const nodes = Object.keys(treeNodes);

  nodes.forEach(node => {
    distances[node] = Infinity;
  });
  distances[startNode] = 0;

  logEvent(`Starting Dijkstra's Algorithm from Node: ${startNode}`);

  while (nodes.length > 0) {
    // Find the unvisited node with the smallest distance
    let minNode = null;
    for (let node of nodes) {
      if (!visited.has(node) && (minNode === null || distances[node] < distances[minNode])) {
        minNode = node;
      }
    }

    if (minNode === null) break;

    visited.add(minNode);
    logEvent(`Visiting Node: ${minNode}, Current Distance: ${distances[minNode]}`);

    for (let child of treeNodes[minNode].children) {
      const newDistance = distances[minNode] + 1; // Assuming unweighted edges
      if (newDistance < distances[child]) {
        distances[child] = newDistance;
        logEvent(`Updated Distance for Node: ${child}, New Distance: ${newDistance}`);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate animation delay
  }

  logEvent(`Dijkstra's Algorithm Complete. Distances: ${JSON.stringify(distances)}`);
  return distances;
};

// A* Search Algorithm
export const aStar = async (startNode, goalNode, logEvent) => {
  const openSet = new Set([startNode]);
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  Object.keys(treeNodes).forEach(node => {
    gScore[node] = Infinity;
    fScore[node] = Infinity;
  });

  gScore[startNode] = 0;
  fScore[startNode] = heuristic(startNode, goalNode);

  logEvent(`Starting A* Algorithm from Node: ${startNode} to Node: ${goalNode}`);

  while (openSet.size > 0) {
    let currentNode = null;
    let lowestFScore = Infinity;

    for (let node of openSet) {
      if (fScore[node] < lowestFScore) {
        lowestFScore = fScore[node];
        currentNode = node;
      }
    }

    if (currentNode === goalNode) {
      logEvent(`A* Goal Found at Node: ${goalNode}`);
      return reconstructPath(cameFrom, currentNode);
    }

    openSet.delete(currentNode);
    logEvent(`Exploring Node: ${currentNode}`);

    for (let neighbor of treeNodes[currentNode].children) {
      const tentativeGScore = gScore[currentNode] + 1;
      if (tentativeGScore < gScore[neighbor]) {
        cameFrom[neighbor] = currentNode;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goalNode);

        logEvent(`Updated Scores for Node: ${neighbor}, gScore: ${gScore[neighbor]}, fScore: ${fScore[neighbor]}`);

        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
          logEvent(`Added Node: ${neighbor} to Open Set`);
        }
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate animation delay
  }

  logEvent("A* Search Complete. No Path Found.");
  return [];
};

// Heuristic for A* (example: Manhattan Distance)
const heuristic = (node, goalNode) => {
  return Math.abs(parseInt(node) - parseInt(goalNode)); // Customize as per graph structure
};

// Path Reconstruction for A*
const reconstructPath = (cameFrom, currentNode) => {
  const path = [];
  while (currentNode in cameFrom) {
    path.unshift(currentNode);
    currentNode = cameFrom[currentNode];
  }
  path.unshift(currentNode); // Add the start node
  return path;
};
