const ManhattanDistance = (firstNode, secondNode) => {
  return Math.abs(firstNode.row - secondNode.row) + Math.abs(firstNode.col - secondNode.col)
}

/****** very similar to A*. Does not ensure shortest path, but is more space efficient ******/
export function greedy(grid, startNode, finishNode){
  resetAllNodes(grid)
  let openList = []
  let closedList = []

  openList.push({h: 0, f: 0, node: startNode})

  while(openList.length > 0){
    let index
    let min = Infinity
    for(let i = 0; i < openList.length; i++){
      if(openList[i].f < min){
        min = openList[i].f
        index = i
      }
    }
    let currentNodeBin = openList[index]
    openList.splice(index, 1)
    let currentNode = currentNodeBin.node
    if(currentNode.isWall) continue
    closedList.push(currentNode)

    if(currentNode === finishNode) return returnList(currentNode, closedList)

    let list = [null, null, null, null]
    if (currentNode.row > 0) list[0] = grid[currentNode.row-1][currentNode.col]
    if (currentNode.row < 19) list[1] = grid[currentNode.row+1][currentNode.col]
    if (currentNode.col > 0) list[2] = grid[currentNode.row][currentNode.col-1]
    if (currentNode.col < 49) list[3] = grid[currentNode.row][currentNode.col+1]

    for(let i = 0; i < 4; i++){
      if(list[i] !== null){
        //If it has already been searched
        if(closedList.some(el => el.row === list[i].row && el.col === list[i].col)) continue

        let h = ManhattanDistance(list[i], finishNode)
        let f = h
        let child = {h: h, f: f, node: list[i]}


        if(openList.some(el => el.node.row === child.node.row && el.node.col === child.node.col)){
          if (child.f >= openList.find(obj => obj.node.row === child.node.row && obj.node.col === child.node.col).f) continue
        }


        child.node.previousNode = currentNode
        openList.push(child)

      }
    }
  }
  return ({shortestPathGreedy: [], visitedThings: closedList})
}

function resetAllNodes(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.previousNode = null;
    }
  }
}

const returnList = (currentNode, closedList) => {
  let current = currentNode
  let path = []
  while (current !== null){
    path.unshift(current)
    current = current.previousNode
  }
  return {shortestPathGreedy: path, visitedThings: closedList}
}
