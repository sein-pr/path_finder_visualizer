import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { astar, getNodesInAStarPathOrder } from '../algorithms/astar';
import { bfs, getNodesInBFSPathOrder } from '../algorithms/bfs';
import { greedyBestFirstSearch, getNodesInGBFSPathOrder } from '../algorithms/gbfs'; // Import GBFS algorithm
import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      draggingNode: null,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const node = this.state.grid[row][col];
    // Prevent wall toggling if the node is start or finish
    if (!node.isStart && !node.isFinish) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const node = this.state.grid[row][col];
    // Prevent wall toggling if the node is start or finish
    if (!node.isStart && !node.isFinish) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
    }
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleDragStart(row, col) {
    this.setState({ draggingNode: { row, col } });
  }

  handleDragEnd(row, col) {
    const { draggingNode, grid } = this.state;
    if (draggingNode) {
      const newGrid = grid.slice();
      const draggedNode = newGrid[draggingNode.row][draggingNode.col];
      const targetNode = newGrid[row][col];

      // Swap start and finish nodes if applicable
      if (targetNode.isStart || targetNode.isFinish) {
        // If dragging start node onto finish node
        if (draggedNode.isStart) {
          targetNode.isStart = true;
          draggedNode.isStart = false;
        }
        // If dragging finish node onto start node
        else if (draggedNode.isFinish) {
          targetNode.isFinish = true;
          draggedNode.isFinish = false;
        }
      } else {
        // Move start node or finish node to a new location
        targetNode.isStart = draggedNode.isStart;
        targetNode.isFinish = draggedNode.isFinish;
        draggedNode.isStart = false;
        draggedNode.isFinish = false;
      }

      // Update the grid state
      this.setState({ grid: newGrid, draggingNode: null });
    }
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
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

  animateBFS(visitedNodesInOrder, nodesInBFSPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInBFSPathOrder);
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

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeAStar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInAStarPathOrder = getNodesInAStarPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInAStarPathOrder);
  }

  visualizeBFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInBFSPathOrder = getNodesInBFSPathOrder(finishNode);
    this.animateBFS(visitedNodesInOrder, nodesInBFSPathOrder);
  }

  visualizeGBFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = greedyBestFirstSearch(grid, startNode, finishNode);
    const nodesInGBFSPathOrder = getNodesInGBFSPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInGBFSPathOrder); // Reusing animateDijkstra for visualization
  }

  clearPath() {
    const grid = getInitialGrid(); // Reset the grid
    this.setState({ grid, mouseIsPressed: false }); // Reset state

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
          } else if (row === START_NODE_ROW && col === START_NODE_COL) {
            nodeElement.className = 'node node-start'; // Ensure start node retains its class
          } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            nodeElement.className = 'node node-finish'; // Ensure finish node retains its class
          }
        }
      }
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div className="button-container">
          <button className="button" onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
          </button>
          <button className="button" onClick={() => this.visualizeAStar()}>
            Visualize A* Algorithm
          </button>
          <button className="button" onClick={() => this.visualizeBFS()}>
            Visualize Breadth-First Search (BFS)
          </button>
          <button className="button" onClick={() => this.visualizeGBFS()}>
            Visualize Greedy Best-First Search
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
                      onDragStart={() => this.handleDragStart(row, col)}
                      onDragEnd={() => this.handleDragEnd(row, col)}
                      row={row}
                    />
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