
export function dfs(grid, startNode, finishNode) {
    resetAllNodes(grid)
    let discovering = []
    let s = []
    s.push(startNode)
      console.log('yooo')
    while (s.length > 0) {
        console.log('yooo1111')
        let v = s.pop()
        if (v.isWall) continue

        if (!discovering.includes(v)) {
            discovering.push(v)
            if (v === finishNode) return returnList(v, discovering)
            let list = [null, null, null, null]
            if (v.col > 0) list[0] = grid[v.row][v.col-1]
            if (v.row < 19) list[1] = grid[v.row+1][v.col]
            if (v.col < 49) list[2] = grid[v.row][v.col+1]
            if (v.row > 0) list[3] = grid[v.row-1][v.col]
            for(let i = 0; i < 4; i++){
              if(list[i] !== null){
                if(!discovering.includes(list[i])) list[i].previousNode = v
                s.push(list[i])
              }
            }
        }
    }
    return ({shortestPathDFS: [], visitedItems: discovering})
}

const returnList = (currentNode, closedList) => {
  let current = currentNode
  let path = []
  while (current !== null){
    console.log(current)
    path.unshift(current)
    current = current.previousNode
  }
  console.log([path, closedList])
  return {shortestPathDFS: path, visitedItems: closedList}
}

function resetAllNodes(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.previousNode = null;
    }
  }
}
