// PathfindingVisualizer/PathfindingVisualizer.js

import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { astar, getNodesInAStarPathOrder } from '../algorithms/astar';
import { bfs, getNodesInBFSPathOrder } from '../algorithms/bfs';
import { greedyBestFirstSearch, getNodesInGBFSPathOrder } from '../algorithms/gbfs';
import { dfs } from '../algorithms/dfs';
import './PathfindingVisualizer.css';

// Define initial positions for the start and finish nodes
const START_NODE_ROW = 10; // Example starting row
const START_NODE_COL = 15; // Example starting column
const FINISH_NODE_ROW = 10; // Example finishing row
const FINISH_NODE_COL = 35; // Example finishing column

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      selectedAlgorithm: '',
      draggingNode: null,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const node = this.state.grid[row][col];
    if (!node.isStart && !node.isFinish) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const node = this.state.grid[row][col];
    if (!node.isStart && !node.isFinish) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleDragStart(row, col) {
    const node = this.state.grid[row][col];
    if (node.isStart || node.isFinish) {
      this.setState({ draggingNode: node });
    }
  }

  handleDragEnter(row, col) {
    const { grid, draggingNode } = this.state;
    if (!draggingNode) return;

    const newGrid = grid.slice();
    const targetNode = newGrid[row][col];

    if (!targetNode.isWall && !targetNode.isStart && !targetNode.isFinish) {
      if (draggingNode.isStart) {
        newGrid[draggingNode.row][draggingNode.col].isStart = false;
        targetNode.isStart = true;
      } else if (draggingNode.isFinish) {
        newGrid[draggingNode.row][draggingNode.col].isFinish = false;
        targetNode.isFinish = true;
      }

      this.setState({ grid: newGrid, draggingNode: targetNode });
    }
  }

  handleDrop(row, col) {
    this.setState({ draggingNode: null });
  }

  handleAlgorithmChange(algorithm, className) {
    if (algorithm !== className) {
      this.setState({ selectedAlgorithm: algorithm });
    }
  }

  visualizeAlgorithm() {
    const { selectedAlgorithm } = this.state;
    switch (selectedAlgorithm) {
      case 'dijkstra':
        this.visualizeDijkstra();
        break;
      case 'astar':
        this.visualizeAStar();
        break;
      case 'bfs':
        this.visualizeBFS();
        break;
      case 'gbfs':
        this.visualizeGBFS();
        break;
      case 'dfs':
        this.visualizeDFS();
        break;
      default:
        alert('Please select an algorithm');
        break;
    }
  }

  animateAlgorithm(visitedNodesInOrder, nodesInPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 40 * i);
    }
  }

  getStartAndFinishNodes() {
    const { grid } = this.state;
    let startNode = null;
    let finishNode = null;

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const node = grid[row][col];
        if (node.isStart) startNode = node;
        if (node.isFinish) finishNode = node;
      }
    }

    return { startNode, finishNode };
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const { startNode, finishNode } = this.getStartAndFinishNodes();
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAStar() {
    const { grid } = this.state;
    const { startNode, finishNode } = this.getStartAndFinishNodes();
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInAStarPathOrder = getNodesInAStarPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInAStarPathOrder);
  }

  visualizeBFS() {
    const { grid } = this.state;
    const { startNode, finishNode } = this.getStartAndFinishNodes();
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInBFSPathOrder = getNodesInBFSPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInBFSPathOrder);
  }

  visualizeGBFS() {
    const { grid } = this.state;
    const { startNode, finishNode } = this.getStartAndFinishNodes();
    const visitedNodesInOrder = greedyBestFirstSearch(grid, startNode, finishNode);
    const nodesInGBFSPathOrder = getNodesInGBFSPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInGBFSPathOrder);
  }

  visualizeDFS() {
    const { grid } = this.state;
    const { startNode, finishNode } = this.getStartAndFinishNodes();
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    this.animateAlgorithm(visitedNodesInOrder, visitedNodesInOrder);
  }

  clearPath() {
    const grid = getInitialGrid(); // Reset the grid
    this.setState({ grid, mouseIsPressed: false, selectedAlgorithm: '' }); // Reset state

    // Retain the start and finish nodes in their initial state
    grid[START_NODE_ROW][START_NODE_COL].isStart = true;
    grid[FINISH_NODE_ROW][FINISH_NODE_COL].isFinish = true;

    // Resetting CSS classes for all nodes except start and finish
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        const nodeElement = document.getElementById(`node-${row}-${col}`);
        if (nodeElement) {
          if (
            !(row === START_NODE_ROW && col === START_NODE_COL) &&
            !(row === FINISH_NODE_ROW && col === FINISH_NODE_COL)
          ) {
            nodeElement.className = 'node'; // Reset to default class
          } else {
            nodeElement.className = `node ${
              row === START_NODE_ROW && col === START_NODE_COL
                ? 'node-start'
                : 'node-finish'
            }`; // Maintain start and finish classes
          }
        }
      }
    }
  }

  render() {
    const { grid, mouseIsPressed, selectedAlgorithm } = this.state;

    return (
      <>
        <div className="dropdown-container">
          <select
            className="algorithm-dropdown"
            onChange={(e) =>
              this.handleAlgorithmChange(e.target.value, 'Weighted Algorithms')
            }
          >
            <option value="Weighted Algorithms">Weighted Algorithms</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
            <option value="astar">A* Algorithm</option>
          </select>
          <select
            className="algorithm-dropdown"
            onChange={(e) =>
              this.handleAlgorithmChange(e.target.value, 'Unweighted Algorithms')
            }
          >
            <option value="Unweighted Algorithms">Unweighted Algorithms</option>
            <option value="bfs">Breadth-First Search (BFS)</option>
            <option value="dfs">Depth-First Search (DFS)</option>
          </select>
          <select
            className="algorithm-dropdown"
            onChange={(e) =>
              this.handleAlgorithmChange(e.target.value, 'Heuristic Algorithms')
            }
          >
            <option value="Heuristic Algorithms">Heuristic Algorithms</option>
            <option value="gbfs">Greedy Best-First Search</option>
          </select>
        </div>
        {selectedAlgorithm && (
          <div className="selected-algorithm">
            Selected Algorithm: {selectedAlgorithm}
          </div>
        )}
        <div className="button-container">
          <button className="button" onClick={() => this.visualizeAlgorithm()}>
            Visualize Algorithm
          </button>
          <button className="button" onClick={() => this.clearPath()}>
            Clear Path
          </button>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      onDragStart={(row, col) => this.handleDragStart(row, col)}
                      onDragEnter={(row, col) => this.handleDragEnter(row, col)}
                      onDrop={(row, col) => this.handleDrop(row, col)}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
