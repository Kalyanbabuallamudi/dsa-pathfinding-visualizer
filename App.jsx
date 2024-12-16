import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";

function App() {
  return (
    <div className="App">
      <h1>Interactive DSA Pathfinding Visualizer: Visualize and Understand Algorithms in Real-Time</h1>
      <Controls />
      <Grid />
    </div>
  );
}

export default App;
