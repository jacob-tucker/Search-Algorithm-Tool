import React from 'react';

import './Node.css';

const Node = (props) => {

  const {
    col,
    isFinish,
    isStart,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row,
  } = props;

  var extraName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : ''

  //classNames are of this div
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp(row, col)}></div>
  );
}

export default Node
