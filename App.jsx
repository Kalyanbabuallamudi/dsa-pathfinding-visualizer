import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";

function App() {
  return (
    <div className="App">
      <h1>Pathfinding Visualizer</h1>
      <Controls />
      <Grid />
    </div>
  );
}

export default App;
