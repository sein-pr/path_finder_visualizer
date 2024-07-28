// algorithms/bellmanFord.js

export function bellmanFord(grid, startNode, finishNode) {
    const nodes = getAllNodes(grid);
    startNode.distance = 0;
  
    // Relax edges repeatedly
    for (let i = 0; i < nodes.length - 1; i++) {
      for (const node of nodes) {
        const { row, col, distance, isWall } = node;
        if (isWall) continue;
        const neighbors = getUnvisitedNeighbors(node, grid);
        for (const neighbor of neighbors) {
          const weight = 1; // Assuming all edges have the same weight
          const newDistance = distance + weight;
          if (newDistance < neighbor.distance) {
            neighbor.distance = newDistance;
            neighbor.previousNode = node;
          }
        }
      }
    }
  
    // Check for negative-weight cycles
    for (const node of nodes) {
      const { distance, isWall } = node;
      if (isWall) continue;
      const neighbors = getUnvisitedNeighbors(node, grid);
      for (const neighbor of neighbors) {
        const weight = 1; // Assuming all edges have the same weight
        if (distance + weight < neighbor.distance) {
          throw new Error('Graph contains a negative-weight cycle');
        }
      }
    }
  
    return nodes;
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
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
  
  export function getNodesInBellmanFordPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  