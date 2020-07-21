/* BINARY HEAP (Priority Queue) IMPLEMENTATION */
class BinHeap {
    // Constructs a new binary heap with the given capacity and
    // less-than function for type X.
    constructor(capacity, lt) {
        this._size = 0
        this._lt = lt
        this._data = []
        for(let i = 0; i < capacity; i++){
          this._data.push(null)
        }
    }

    len() {
        return this._size
    }

    insert(new_element) {
        if (this._size === this._data.length){
          return 'error'
        }
        this._data[this._size] = new_element
        this._size = this._size + 1

        if(this._size !== 1){
          let current_index = this._size - 1

          while (this._lt(this._data[current_index], this._data[Math.floor((current_index-1)/2)])){
              if (current_index === 0){
                return
              }else{
                  this._swap(current_index, (current_index-1)/2)
                  current_index = (current_index-1)/2
              }
          }
        }
    }

    find_min() {
        if (this._size === 0) {
          return 'error'
        }else {
          return this._data[0]
        }
    }

    remove_min() {
        if (this._size === 0) {
          return 'error'
        }else if (this._size === 1) {
            this._data[0] = null
            this._size = this._size - 1
            return
        }
        this._data[0] = this._data[this._size-1]
        this._data[this._size-1] = null
        this._size = this._size - 1
        let current_index = 0
        let index = this._find_smaller_child(current_index)
        while (index !== current_index) {
            this._swap(current_index, index)
            current_index = index
            index = this._find_smaller_child(current_index)
        }
    }

    // If the element at index i has any children smaller than itthis,
    // returns the index of the smallest child; if i has no children,
    // or none of the children is smaller than the element at i,
    // returns i
    _find_smaller_child(i) {
        if ((2*i + 1) > this._size || this._data[2*i + 1] == null) return i
        if (this._data[2*i + 1] != null && this._data[2*i + 2] == null){
            if (this._lt(this._data[2*i + 1], this._data[i])) return (2*i + 1)
        }
        if ((2*i + 2) > this._size || this._data[2*i + 2] == null) return i
        if (this._lt(this._data[2*i + 1], this._data[i]) || this._lt(this._data[2*i + 2], this._data[i])) {
            if (this._lt(this._data[2*i + 1], this._data[2*i + 2])) return (2*i + 1)
            else return (2*i + 2)
        }
        else return i
    }

    // Swaps the elements at indices i and j.
    _swap(i, j) {
        let holder = this._data[j]
        this._data[j] = this._data[i]
        this._data[i] = holder
    }
}

/* WORKING IMPLEMENTATION (CURRENT USE) WITH BINARY HEAP (PRIORITY QUEUE) */
export function dijkstras(graph, src_lat, src_lon, finishNode) {
  //PART 1: EXPLORATION

  //Initialize dist vector, filled with Infinity to follow Dijkstra's algorithm
  const dist = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(Infinity);
    }
    dist.push(currentRow);
  }

  //Initialize pred vector, a vector that holds all of the Nodes and for each Node attempts to trace back to the start by following pred
  //backwards
  const pred = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(null);
    }
    pred.push(currentRow);
  }
  dist[src_lat][src_lon] = 0
  var finished = []

  //Insert the distance, and then the node, and
  //remove min removes the one with the smallest distance

  //Initializing binary heap to utilize remove_min() functionality and easily find the next node to explore, then inserting first key_value pair
  //key represents distance from the start, value represents the node
  let todo = new BinHeap(100, (x, y) => {
    return x.key < y.key
  })
  todo.insert({key: 0, value: graph[src_lat][src_lon]})

  //Graph goes (row, col)

  //While there are things to do...
  while (todo.len() !== 0) {
    let v = todo.find_min().value
    todo.remove_min()

    //If the node (v) is a wall, go again on next node in priority queue
    if (v.isWall) continue
    if (!finished.includes(v)) {
      finished.push(v)

      //If the node we are exploring is the finish, let's get out of this loop and go onto the next part
      if (v === finishNode) break
      //Making a list of neighbors to explore them (if they exist)
      let list = [null, null, null, null]

      if (v.row > 0) list[0] = [v.row-1, v.col]
      if (v.row < 19) list[1] = [v.row+1, v.col]
      if (v.col > 0) list[2] = [v.row, v.col-1]
      if (v.col < 49) list[3] = [v.row, v.col+1]

      //Go through (max) 4 neighbors and update dist & pred arrays, then insert next neighbors
      let index = 0
      while (index < 5) {
        if(list[index] != null) {
          if (dist[v.row][v.col] + 1 < dist[list[index][0]][list[index][1]]) {
            dist[list[index][0]][list[index][1]] = dist[v.row][v.col] + 1
            pred[list[index][0]][list[index][1]] = v
            todo.insert({key: dist[list[index][0]][list[index][1]], value: graph[list[index][0]][list[index][1]]})
          }
        }
        index = index + 1
      }
    }
  }

  //PART 2: GETTING ANSWER (THE SHORTEST) PATH

  //Start at finish node and work backwards through pred array: (at every index [][] of pred array holds the previous node to
  //the current one at that index, or null if none, in which we stop because that probably indicates the start node or impossibility)
  var node = finishNode
  var shortPath = []
  while(node != null){
    shortPath.unshift(node)
    node = pred[node.row][node.col]
  }

  return {finished, shortPath}
}





/* WORKING IMPLEMENTATION WITHOUT BINARY HEAP (PRIORITY QUEUE) */

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstraNoBin(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid, startNode);

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode){
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid, startNode) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      node.previousNode = null;
      node.isVisited = false;
      if(node !== startNode) node.distance = Infinity;
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
