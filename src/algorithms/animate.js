export const animateAlgorithm = (visitedNodes) => {
    for (let i = 0; i < visitedNodes.length; i++) {
      setTimeout(() => {
        const node = visitedNodes[i];
        const element = document.getElementById(`node-${node.rowIdx}-${node.colIdx}`);
        if (element) {
          element.className = "node node-visited"; // Apply a CSS class for animation
        }
      }, 50 * i); // Adjust timing as needed
    }
  };
  