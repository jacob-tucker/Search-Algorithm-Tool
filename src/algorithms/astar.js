const ManhattanDistance = (firstNode, secondNode) => {
  return Math.abs(firstNode.row - secondNode.row) + Math.abs(firstNode.col - secondNode.col)
}

/****** astar algorithm from https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2 ******/
export function astar(grid, startNode, finishNode){
  resetAllNodes(grid)
  let openList = []
  let closedList = []

  openList.push({g: 0, h: 0, f: 0, node: startNode})

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
        //if(closedList.includes(list[i])) continue
        if(closedList.some(el => el.row === list[i].row && el.col === list[i].col)) continue

        let g = currentNodeBin.g + 1
        let h = ManhattanDistance(list[i], finishNode)
        let f = g + h
        let child = {g: g, h: h, f: f, node: list[i]}


        if(openList.some(el => el.node.row === child.node.row && el.node.col === child.node.col)){
          if (child.g >= openList.find(obj => obj.node.row === child.node.row && obj.node.col === child.node.col).g) continue
        }


        child.node.previousNode = currentNode
        openList.push(child)

      }
    }
  }
  return ({shortestPathAStar: [], visitedStuff: closedList})
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
  return {shortestPathAStar: path, visitedStuff: closedList}
}


/****** astar algorithm from Wikipedia ******/
export function astar2(grid, startNode, finishNode) {
    resetAllNodes(grid)
    // The set of discovered nodes that may need to be (re-)expanded.
    // Initially, only the start node is known.
    // This is usually implemented as a min-heap or priority queue rather than a hash-set.
    let openSet = [{f: ManhattanDistance(startNode, finishNode), node: startNode}]

    // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
    // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
    // how short a path from start to finish can be if it goes through n.
    var gScore = new Map();
    var fScore = new Map();
    for (const row of grid) {
      for (const node of row) {
        node.previousNode = null;
        gScore.set(node, Infinity)
        fScore.set(node, Infinity)
      }
    }
    gScore.set(startNode, 0)
    fScore.set(startNode, ManhattanDistance(startNode, finishNode))
    let finishers = []

    while (openSet.length > 0) {
      // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
      let min = Infinity
      let index
      for(let j = 0; j < openSet.length; j++){
        if(openSet[j].f < min){
          min = openSet[j].f
          index = j
        }
      }
      let current = openSet[index].node
      if (current === finishNode) return returnList(current, finishers)

      openSet.splice(index, 1)
      if(current.isWall) continue
      finishers.push(current)

      let list = [null, null, null, null]
      if (current.row > 0) list[0] = grid[current.row-1][current.col]
      if (current.row < 19) list[1] = grid[current.row+1][current.col]
      if (current.col > 0) list[2] = grid[current.row][current.col-1]
      if (current.col < 49) list[3] = grid[current.row][current.col+1]

      for (let i = 0; i < 4; i++){
        if(list[i] !== null){
          // d(current,neighbor) is the weight of the edge from current to neighbor
          // tentative_gScore is the distance from start to the neighbor through current
          let tentative_gScore = gScore.get(current) + 1
          if (tentative_gScore < gScore.get(list[i])){
              // This path to neighbor is better than any previous one. Record it!
              list[i].previousNode = current
              gScore.set(list[i], tentative_gScore)
              fScore.set(list[i], gScore.get(list[i]) + ManhattanDistance(list[i], finishNode))
              if (!openSet.some(el => el.node === list[i])){
                openSet.push({f: fScore.get(list[i]), node: list[i]})
              }
          }
        }
      }
    }
    // Open set is empty but goal was never reached
    return ({shortestPathAStar: [], visitedStuff: finishers})
}
