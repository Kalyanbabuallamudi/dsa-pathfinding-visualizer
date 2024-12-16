import React, { useState } from "react";
import { bfs, dfs, dijkstra, aStar } from "./utils/treeAlgorithms";
import TreeVisualizer from "./components/TreeVisualizer";
import "./AlgorithmInsights.css"; // Add a separate CSS file for styling

const Controls = ({ setAlgorithm, executeAlgorithm }) => {
  const handleSelection = (event) => setAlgorithm(event.target.value);

  return (
    <div className="controls">
      <h2 className="controls-title">Choose Your Algorithm</h2>
      <select className="algorithm-select" onChange={handleSelection}>
        <option value="">-- Select Algorithm --</option>
        <option value="BFS">BFS (Breadth-First Search)</option>
        <option value="DFS">DFS (Depth-First Search)</option>
        <option value="Dijkstra">Dijkstra</option>
        <option value="A*">A* (A-Star)</option>
      </select>
      <button className="run-button" onClick={executeAlgorithm}>
        Run Algorithm
      </button>
    </div>
  );
};

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [traversalPath, setTraversalPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);

  const logToConsole = (message) => {
    setConsoleLogs((prevLogs) => [...prevLogs, message]);
    console.log(message); // Log to browser console for debugging
  };

  const normalizeResults = (results) => {
    if (Array.isArray(results)) {
      return results;
    }
    if (typeof results === "object") {
      return Object.keys(results).map((key) => parseInt(key, 10));
    }
    return [];
  };

  const executeAlgorithm = async () => {
    if (!selectedAlgorithm) {
      logToConsole("Please select an algorithm first!");
      alert("Please select an algorithm first!");
      return;
    }

    setIsRunning(true);
    setConsoleLogs([]); // Clear previous logs
    logToConsole(`Running ${selectedAlgorithm} algorithm...`);

    let results = [];
    try {
      const logEvent = (message) => logToConsole(`[${selectedAlgorithm}] ${message}`);

      switch (selectedAlgorithm) {
        case "BFS":
          results = await bfs(1, logEvent);
          break;
        case "DFS":
          results = await dfs(1, logEvent);
          break;
        case "Dijkstra":
          results = await dijkstra(1, logEvent);
          break;
        case "A*":
          results = await aStar(1, 10, logEvent); // Example: Start at node 1, target node 10
          break;
        default:
          logToConsole("Invalid algorithm selection.");
          alert("Invalid algorithm selection.");
          return;
      }

      const normalizedResults = normalizeResults(results);
      setTraversalPath(normalizedResults);
      logToConsole(`Traversal Path: ${JSON.stringify(normalizedResults)}`);
    } catch (error) {
      logToConsole(`Error while executing the algorithm: ${error.message}`);
      alert("An error occurred while executing the algorithm.");
    } finally {
      setIsRunning(false);
      logToConsole(`${selectedAlgorithm} algorithm execution finished.`);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>DSA Pathfinding Visualizer: Real-Time Algorithm Insights and Visualization</h1>
        <p>Visualize graph algorithms in an interactive and fun way!</p>
      </header>

      <main>
        <Controls setAlgorithm={setSelectedAlgorithm} executeAlgorithm={executeAlgorithm} />

        {isRunning && <div className="loading-overlay">Running Algorithm...</div>}

        <TreeVisualizer path={traversalPath} />

        {/* Console Output */}
        <div className="console-output">
          <h2>Algorithm Insights</h2>
          <div className="console-logs">
            {consoleLogs.map((log, index) => (
              <div key={index} className="log-entry">
                {log}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>
        Made with <span>&#10084;</span> by Kalyan Babu Allamudi. &copy; 2024 All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
