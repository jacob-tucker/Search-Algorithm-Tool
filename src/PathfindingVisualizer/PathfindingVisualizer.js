import React, { useState, useEffect } from 'react';
import Node from './Node/Node';
import { dijkstras, dijkstraNoBin, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { astar, astar2 } from '../algorithms/astar';
import { greedy } from '../algorithms/greedy'
import { dfs } from '../algorithms/dfs'
import { randomMaze } from '../mazeGenerators/recursiveDivision'
import { exporter } from '../mazeGenerators/random'

import './PathfindingVisualizer.css';
var mouseIsPressed = false;
var thereStart = true;
var thereFinish = true;
var doneYet = false
var visitedNodes = []
var shortestPath = []

const PathfindingVisualizer = () => {
  const [startNodeRow, setStartNodeRow] = useState(10)
  const [startNodeCol, setStartNodeCol] = useState(15)
  const [finishNodeRow, setFinishNodeRow] = useState(10)
  const [finishNodeCol, setFinishNodeCol] = useState(35)
  const [grid, setGrid] = useState([])
  const [stylesStart, setStylesStart] = useState({})
  const [stylesFinish, setStylesFinish] = useState({})
  const [alg, setAlg] = useState('Choose an algorithm')
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)


  useEffect(() => {
    const grid = getInitialGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    setGrid(grid);
  }, []);

  const moving = (event) => {
    if (!thereStart) {
      setStylesStart({ top: event.pageY - 12.5, left: event.pageX - 12.5, width: 5, height: 5, visibility: 'visible' })
      if (doneYet) resetNodes()
    } else if (!thereFinish) {
      setStylesFinish({ top: event.pageY, left: event.pageX, visibility: 'visible' })
      if (doneYet) resetNodes()
    }
  }

  const handleMouseDown = (row, col) => {
    if (row === startNodeRow && col === startNodeCol) {
      const newGrid = getNewGridWithNewStart(grid, row, col)
      setGrid(newGrid)
      thereStart = false;
    } else if (row === finishNodeRow && col === finishNodeCol) {
      const newGrid = getNewGridWithNewFinish(grid, row, col)
      setGrid(newGrid)
      thereFinish = false;
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid)
      mouseIsPressed = true;
    }
  }

  const handleMouseEnter = (row, col) => {
    if (mouseIsPressed) {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid)
    }
  }

  const handleMouseUp = (row, col) => {
    if (!thereStart) {
      setStartNodeRow(row)
      setStartNodeCol(col)
      const newGrid = getNewGridWithNewStart(grid, row, col)
      setGrid(newGrid)
      thereStart = true;
      setStylesStart({})
    } else if (!thereFinish) {
      setFinishNodeRow(row)
      setFinishNodeCol(col)
      const newGrid = getNewGridWithNewFinish(grid, row, col)
      setGrid(newGrid)
      thereFinish = true;
      setStylesFinish({})
    } else mouseIsPressed = false
  }

  const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        //className of the Node, its GETTING the div because the div is what has that ID
        if (!((node.row === finishNodeRow) && (node.col === finishNodeCol)) && !((node.row === startNodeRow) && (node.col === startNodeCol))) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }
      }, 10 * i);
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 1; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        //className of the Node, its GETTING the div because the div is what has that ID
        if (i !== nodesInShortestPathOrder.length - 1) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        }

      }, 50 * i);
    }
  }

  const visualizeDijkstraNoBin = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dijkstraNoBin(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    visitedNodes = visitedNodesInOrder
    shortestPath = nodesInShortestPathOrder
    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const visualizeDijkstra = () => {
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const { finished, shortPath } = dijkstras(grid, startNodeRow, startNodeCol, finishNode);
    visitedNodes = finished
    shortestPath = shortPath
    animate(finished, shortPath);
  }


  const visualizeAStar = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const { shortestPathAStar, visitedStuff } = astar(grid, startNode, finishNode)
    visitedNodes = visitedStuff
    shortestPath = shortestPathAStar
    animate(visitedStuff, shortestPathAStar)
  }

  /*
  const visualizeAStar = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const {shortestPathAStar, visitedStuff} = astar2(grid, startNode, finishNode)
    visitedNodes = visitedStuff
    shortestPath = shortestPathAStar
    animate(visitedStuff, shortestPathAStar)
  }
  */

  const visualizeGreedy = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const { shortestPathGreedy, visitedThings } = greedy(grid, startNode, finishNode)
    visitedNodes = visitedThings
    shortestPath = shortestPathGreedy
    animate(visitedThings, shortestPathGreedy)
  }

  const visualizeDFS = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const { shortestPathDFS, visitedItems } = dfs(grid, startNode, finishNode)
    visitedNodes = visitedItems
    shortestPath = shortestPathDFS
    animate(visitedItems, shortestPathDFS)
  }


  const algDecider = () => {
    if (!doneYet) {
      doneYet = true
    } else {
      resetNodes()
    }
    if (alg === 'Dijkstras Algorithm (without a Binary Heap)') {
      visualizeDijkstraNoBin()
    } else if (alg === 'Dijkstras Algorithm (with a Binary Heap)') {
      visualizeDijkstra()
    } else if (alg === 'A*') {
      visualizeAStar()
    } else if (alg === 'Greedy Best-First Search') {
      visualizeGreedy()
    } else if (alg === 'Depth-First Search') {
      visualizeDFS()
    }
  }

  const resetNodes = () => {
    for (let i = 0; i < visitedNodes.length; i++) {
      const node = visitedNodes[i];
      //if(node.row !== finishNodeRow || node.col !== finishNodeCol){
      document.getElementById(`node-${node.row}-${node.col}`).classList.remove('node-visited');
      //}
    }
    for (let i = 1; i < shortestPath.length - 1; i++) {
      const node = shortestPath[i];
      document.getElementById(`node-${node.row}-${node.col}`).classList.remove('node-shortest-path');
    }
  }

  const doMaze = () => {
    const newGrid = randomMaze(grid)
    //const newGrid = getNewGridWithWallToggled(grid, 1, 1)
    setGrid(newGrid)
  }

  const doMaze2 = () => {
    resetNodes()
    const grid = getInitialGrid(startNodeRow, startNodeCol, finishNodeRow, finishNodeCol);
    setGrid(grid);
    let arrayMoves = exporter(grid)
    for (let i = 0; i < arrayMoves.length; i++) {
      setTimeout(() => {
        const node = arrayMoves[i]
        if (node !== grid[startNodeRow][startNodeCol] && node !== grid[finishNodeRow][finishNodeCol]) {
          const newGrid = getNewGridWithWallToggled(grid, node.row, node.col)
          setGrid(newGrid)
        }

      }, 35 * i)
    }
  }

  return (
    <div>
      <button className="doIt" onClick={() => { if (alg !== 'Choose an algorithm') algDecider() }}>Perform</button>
      <button className="dropdown" onClick={() => {
        setShow(!show)
        setShow1(false)
      }}>Algorithms<span className="caret"></span></button>
      {
        show ? <div className="elements" onClick={() => setShow(false)}><button onClick={() => setAlg('Dijkstras Algorithm (without a Binary Heap)')}>Dijkstra's w/o BinHeap</button>
          <button onClick={() => setAlg('Dijkstras Algorithm (with a Binary Heap)')}>Dijkstra's w/ BinHeap</button>
          <button onClick={() => setAlg('A*')}>A*</button>
          <button onClick={() => setAlg('Greedy Best-First Search')}>Greedy Best-First Search</button>
          <button onClick={() => setAlg('Depth-First Search')}>Depth-First Search</button>

        </div> : null
      }
      <button className="dropdown1" onClick={() => {
        setShow1(!show1)
        setShow(false)
      }}>Mazes<span className="caret"></span></button>
      {
        show1 ? <div className="elements1" onClick={() => setShow1(false)}><button onClick={doMaze}>Random</button>
          <button onClick={doMaze2}>Recursive Division</button>
        </div> : null
      }

      <div className="entire">
        {alg === 'Choose an algorithm'
          ? <div className="namesofAlg"><h2>{alg}</h2></div>
          : alg === 'Dijkstras Algorithm (with a Binary Heap)'
            ? <div className="namesofAlg"><h2>{alg}:</h2><p>Dijkstras's algorithm is <b><i>unweighted</i></b> and <i><b>ensures</b></i> shortest path.</p></div>
            : alg === 'Dijkstras Algorithm (without a Binary Heap)'
              ? <div className="namesofAlg"><h2>{alg}:</h2><p>Dijkstras's algorithm is <b><i>unweighted</i></b> and <i><b>ensures</b></i> shortest path.</p></div>
              : alg === 'A*'
                ? <div className="namesofAlg"><h2>{alg}:</h2><p>The A* algorithm is <b><i>weighted</i></b> and <i><b>ensures</b></i> shortest path.</p></div>
                : alg === 'Greedy Best-First Search'
                  ? <div className="namesofAlg"><h2>{alg}:</h2><p>The Greedy Best-First search algorithm is <b><i>weighted</i></b> and <i><b>does not ensure</b></i> shortest path.</p></div>
                  : alg === 'Depth-First Search'
                    ? <div className="namesofAlg"><h2>{alg}:</h2><p>The Depth-First search algorithm is <b><i>unweighted</i></b> and <i><b>does not ensure</b></i> shortest path.</p></div>
                    : null}

        <div className="grid" onMouseMove={moving}>
          <div style={stylesStart} className="removeplz1"></div>
          <div style={stylesFinish} className="removeplz2"></div>
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="rowClass">
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (

                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      onMouseDown={() => handleMouseDown(row, col)}
                      onMouseEnter={() =>
                        handleMouseEnter(row, col)
                      }
                      onMouseUp={() => handleMouseUp(row, col)}
                      row={row}></Node>

                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

    </div >
  );
}

export default PathfindingVisualizer

const getInitialGrid = (startNodeRow, startNodeCol, finishNodeRow, finishNodeCol) => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      let node = createNode(col, row, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol)
      currentRow.push(node);
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (col, row, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol) => {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithNewStart = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isStart: !node.isStart,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}

const getNewGridWithNewFinish = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isFinish: !node.isFinish,
  };
  newGrid[row][col] = newNode;
  return newGrid;
}
