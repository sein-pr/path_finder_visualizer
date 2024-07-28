// Node/Node.js

import React from 'react';
import './Node.css';

export default class Node extends React.Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
      onDragStart,
      onDragEnter,
      onDrop,
    } = this.props;

    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        draggable={isStart || isFinish}
        onDragStart={() => onDragStart(row, col)}
        onDragEnter={() => onDragEnter(row, col)}
        onDrop={() => onDrop(row, col)}
      ></div>
    );
  }
}
