export function randomMaze(grid) {
  //must make a shallow copy by doing .slice() because if we just said newGrid = grid then newGrid is a reference by the nature
  //of Javascript and so when we later do setGrid(newGrid) inside PathfindingVisualizer.js it would say "oh it already is that"
  //and not update the state immediately so it wouldn't re-render, but this makes it re-render properly.
  const newGrid = grid.slice()
  let rand
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 50; col++) {
      rand = Math.floor((Math.random() * 5) + 1);
      if (rand === 1) newGrid[row][col].isWall = true
    }
  }
  return newGrid;
}
