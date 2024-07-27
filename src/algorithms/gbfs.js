class MinHeap {
    constructor() {
      this.nodes = [];
    }
  
    insert(node) {
      this.nodes.push(node);
      this.bubbleUp();
    }
  
    bubbleUp() {
      let index = this.nodes.length - 1;
      const element = this.nodes[index];
      while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        let parent = this.nodes[parentIndex];
        if (element.heuristic >= parent.heuristic) break;
        this.nodes[index] = parent;
        index = parentIndex;
      }
      this.nodes[index] = element;
    }
  
    extractMin() {
      const min = this.nodes[0];
      const end = this.nodes.pop();
      if (this.nodes.length > 0) {
        this.nodes[0] = end;
        this.sinkDown();
      }
      return min;
    }
  
    sinkDown() {
      let index = 0;
      const length = this.nodes.length;
      const element = this.nodes[0];
  
      while (true) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let leftChild, rightChild;
        let swap = null;
  
        if (leftChildIndex < length) {
          leftChild = this.nodes[leftChildIndex];
          if (leftChild.heuristic < element.heuristic) {
            swap = leftChildIndex;
          }
        }
  
        if (rightChildIndex < length) {
          rightChild = this.nodes[rightChildIndex];
          if (
            (swap === null && rightChild.heuristic < element.heuristic) ||
            (swap !== null && rightChild.heuristic < leftChild.heuristic)
          ) {
            swap = rightChildIndex;
          }
        }
  
        if (swap === null) break;
        this.nodes[index] = this.nodes[swap];
        index = swap;
      }
      this.nodes[index] = element;
    }
  
    isEmpty() {
      return this.nodes.length === 0;
    }
  }
  
  export function greedyBestFirstSearch(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const minHeap = new MinHeap();
    startNode.heuristic = heuristic(startNode, finishNode);
    minHeap.insert(startNode);
  
    while (!minHeap.isEmpty()) {
      const closestNode = minHeap.extractMin();
  
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
  
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
  
      if (closestNode === finishNode) return visitedNodesInOrder;
  
      updateUnvisitedNeighbors(closestNode, grid, minHeap, finishNode);
    }
  }
  
  function updateUnvisitedNeighbors(node, grid, minHeap, finishNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      if (!neighbor.isVisited) {
        neighbor.heuristic = heuristic(neighbor, finishNode);
        neighbor.previousNode = node;
        minHeap.insert(neighbor); // Insert updated neighbor into the min-heap
      }
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
  
    // Directions: up, down, left, right
    const directions = [
      { row: row - 1, col }, // Up
      { row: row + 1, col }, // Down
      { row, col: col - 1 }, // Left
      { row, col: col + 1 }, // Right
    ];
  
    for (const direction of directions) {
      const { row: newRow, col: newCol } = direction;
      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length
      ) {
        neighbors.push(grid[newRow][newCol]);
      }
    }
  
    return neighbors;
  }
  
  function heuristic(nodeA, nodeB) {
    // Using Manhattan distance as the heuristic
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
  }
  
  export function getNodesInGBFSPathOrder(finishNode) {
    const nodesInPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInPathOrder;
  }