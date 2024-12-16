# Pathfinding Visualizer

A React-based pathfinding visualizer designed to showcase various graph search algorithms (like Dijkstra, A*, BFS, DFS) using tree nodes for educational purposes. This project visualizes the process of pathfinding, allowing users to interactively select the algorithm and visualize the shortest path through tree nodes. Users can also check live updates of the algorithm's process in the browser console.

## Features

- **Interactive Tree Nodes**: Users can select nodes, set start/end points, and add obstacles to create a tree-like structure for pathfinding.
- **Pathfinding Algorithms**: Supports Dijkstra, A*, BFS, and DFS algorithms to find the shortest path.
- **Live Updates (Algorithm Insights)**: See live algorithm updates directly in the browser console for detailed insights into each step of the algorithm.
- **Animation Control**: Speed control for algorithm animations (slow, medium, fast).
- **Responsive UI**: The app is fully responsive and works on both desktop and mobile devices.
- **Real-Time Visualization**: Watch the algorithm search and visualize the pathfinding process in real-time.

## Technologies Used

- **Frontend**: React.js, HTML, CSS, JavaScript
- **State Management**: React State (Context API/UseState)
- **Animation**: CSS animations
- **Styling**: CSS3, Flexbox, and custom tree node styling for interactive visualization

## Setup and Installation

To run the project locally, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/dsa-pathfinding-visualizer.git
    ```

2. Navigate to the project directory:
    ```bash
    cd dsa-pathfinding-visualizer
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

    Or if using yarn:

    ```bash
    yarn install
    ```

4. Run the development server:
    ```bash
    npm start
    ```

    Or if using yarn:

    ```bash
    yarn start
    ```

5. Open the app in your browser at `http://localhost:3000`.

## Usage

1. **Select an Algorithm**: Choose between Dijkstra, A*, BFS, or DFS from the dropdown.
2. **Set Start and End Nodes**: Click on tree nodes to set the starting and ending points.
3. **Add Obstacles**: Click on tree nodes to add/remove obstacles.
4. **Run the Algorithm**: Hit the "Run" button to see the algorithm in action and watch the animation.
5. **View Algorithm Insights**: Open the browser console to view live updates of the algorithm’s progress, which will provide detailed insights into each step of the pathfinding process.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- The project is inspired by the need to visually demonstrate pathfinding algorithms and help learners understand the algorithmic process better.
- Special thanks to the open-source libraries and resources used in this project.
