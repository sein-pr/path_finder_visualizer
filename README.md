# Path Finder Visualizer

## Overview

The Pathfinding Visualizer is an interactive application that demonstrates various pathfinding algorithms. It allows users to visualize how algorithms like Dijkstra's, A*, Breadth-First Search (BFS), Depth-First Search (DFS), and Greedy Best-First Search (GBFS) work in real-time on a grid.

## Features

- **Interactive Grid:** Click and drag to create walls and see how algorithms navigate around obstacles.
- **Draggable Start/Finish Nodes:** Move the start and finish nodes to test different scenarios.
- **Algorithm Selection:** Choose from multiple algorithms to visualize their pathfinding capabilities.
- **Clear Paths:** Easily reset the grid to try new configurations.
- **Tutorial:** Read the tutorial to get started.

## Algorithms Included

1. **Dijkstra's Algorithm** - A weighted algorithm that guarantees the shortest path.
2. **A* Algorithm** - A heuristic-based weighted algorithm.
3. **Breadth-First Search (BFS)** - An unweighted algorithm that explores all neighbors level by level.
4. **Depth-First Search (DFS)** - An unweighted algorithm that explores as far as possible along each branch.
5. **Greedy Best-First Search (GBFS)** - A heuristic-based algorithm that follows the shortest path to the target.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. **Clone the repository:**

   git clone https://github.com/sein-pr/path_finder_visualizer.git

2. **Install dependencies:**
   npm install

3. **Run the application:**
   npm start

4. Open your browser and go to `http://localhost:3000` to see the application in action.

## Usage

- **Building Walls:** Click and drag on the grid to build walls. Walls act as obstacles for the algorithms.
- **Moving Nodes:** Click and drag the start (green) or finish (red) nodes to move them to different positions.
- **Select an Algorithm:** Use the dropdown menus to select a pathfinding algorithm.
- **Visualize the Algorithm:** Click the "Visualize Algorithm" button to see the chosen algorithm in action.
- **Clear Path:** Use the "Clear Path" button to reset the grid.

## File Structure

- **`src/`:** Contains all the source files for the application.
  - **`PathfindingVisualizer.js:`** Main component for handling the grid and algorithm visualization.
  - **`Node/Node.js:`** Component for individual grid nodes.
  - **`algorithms/`:** Contains all the algorithms implementations.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by various visual pathfinding tools and algorithms online.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For any questions or feedback, please contact [seinprince2@gmail.com](mailto:seinprince2@gmail.com).
