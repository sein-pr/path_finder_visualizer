// bfs.js
export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const queue = [];
    startNode.isVisited = true; // Mark the start node as visited
    queue.push(startNode);
  
    while (queue.length) {
      const currentNode = queue.shift();
      visitedNodesInOrder.push(currentNode);
  
      // Check if we have reached the finish node
      if (currentNode === finishNode) {
        return visitedNodesInOrder;
      }
  
      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        // Skip if the neighbor has been visited or is a wall
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.isVisited = true; // Mark as visited
          neighbor.previousNode = currentNode; // Set the previous node
          queue.push(neighbor); // Add to the queue
        }
      }
    }
  
    return visitedNodesInOrder; // Return visited nodes if no path found
  }
  
  export function getNodesInBFSPathOrder(finishNode) {
    const nodesInPathOrder = [];
    let currentNode = finishNode;
    while (currentNode) {
      nodesInPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInPathOrder;
  }
  
  function getNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
  
    // Add neighbors (up, down, left, right)
    if (row > 0) neighbors.push(grid[row - 1][col]); // Up
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
    if (col > 0) neighbors.push(grid[row][col - 1]); // Left
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right
  
    return neighbors;
  }