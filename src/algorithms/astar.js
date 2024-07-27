// astar.js
export function astar(grid, startNode, finishNode) {
    const openSet = [];
    const closedSet = [];
    openSet.push(startNode);
  
    while (openSet.length) {
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }
  
      const currentNode = openSet[lowestIndex];
  
      if (currentNode === finishNode) {
        return getNodesInAStarPathOrder(finishNode);
      }
  
      openSet.splice(lowestIndex, 1);
      closedSet.push(currentNode);
  
      const neighbors = getNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (!closedSet.includes(neighbor) && !neighbor.isWall) {
          const gScore = currentNode.g + 1; // Assuming 1 for each step
          let gScoreIsBest = false;
  
          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
            gScoreIsBest = true;
          } else if (gScore < neighbor.g) {
            gScoreIsBest = true;
          }
  
          if (gScoreIsBest) {
            neighbor.previousNode = currentNode;
            neighbor.g = gScore;
            neighbor.h = heuristic(neighbor, finishNode);
            neighbor.f = neighbor.g + neighbor.h;
          }
        }
      }
    }
    
    return closedSet; // Return visited nodes if no path found
  }
  
  export function getNodesInAStarPathOrder(finishNode) {
    const nodesInPathOrder = [];
    let currentNode = finishNode;
    while (currentNode) {
      nodesInPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInPathOrder;
  }
  
  function heuristic(nodeA, nodeB) {
    const d = Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
    return d;
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