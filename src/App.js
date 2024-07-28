// App.js
import React, { useState } from 'react';
import './App.css'; // or './HeaderButton.css' if you prefer
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import './HeaderButton.css'; // Import the new CSS file
import TutorialModal from './TutorialModal'; // Import the TutorialModal component

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true); // State to control modal visibility

  const closeModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Pathfinding Visualizer</h1>
      </div>
      <PathfindingVisualizer />
      {isModalOpen && <TutorialModal closeModal={closeModal} />} {/* Render the modal conditionally */}
    </div>
  );
}

export default App;