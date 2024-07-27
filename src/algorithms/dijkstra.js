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
      if (element.distance >= parent.distance) break;
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
        if (leftChild.distance < element.distance) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.nodes[rightChildIndex];
        if (
          (swap === null && rightChild.distance < element.distance) ||
          (swap !== null && rightChild.distance < leftChild.distance)
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

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;

  const minHeap = new MinHeap();
  minHeap.insert(startNode);
  
  while (!minHeap.isEmpty()) {
    const closestNode = minHeap.extractMin();

    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;

    // If the closest node is at a distance of infinity, we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder;

    updateUnvisitedNeighbors(closestNode, grid, minHeap);
  }
}

function updateUnvisitedNeighbors(node, grid, minHeap) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    const newDistance = node.distance + 1; // Adjust for weighted distances if needed
    if (newDistance < neighbor.distance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = node;
      minHeap.insert(neighbor); // Insert updated neighbor into the min-heap
    }
  }
}

// The rest of the functions remain unchanged
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}