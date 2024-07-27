// App.js
import React from 'react';
import './App.css'; // or './HeaderButton.css' if you prefer
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import './HeaderButton.css'; // Import the new CSS file

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Pathfinding Visualizer</h1>
      </div>
      <PathfindingVisualizer />
    </div>
  );
}

export default App;
