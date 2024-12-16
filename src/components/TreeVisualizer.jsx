// components/TreeVisualizer.jsx
import React from "react";
import { treeNodes } from "../utils/treeGraph";
import "./TreeVisualizer.css";

const TreeVisualizer = ({ path }) => {
  return (
    <div className="tree-container">
      {Object.keys(treeNodes).map((key) => {
        const isActive = path.includes(parseInt(key)); // Check if the current node is in the traversal path
        return (
          <div
            key={key}
            className={`tree-node ${isActive ? "active" : ""}`} // Add "active" class if in the traversal path
          >
            {key}
          </div>
        );
      })}
    </div>
  );
};

export default TreeVisualizer;
