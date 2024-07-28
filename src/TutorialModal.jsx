import React, { useState } from 'react';
import './TutorialModal.css'; // Ensure this CSS file exists

const TutorialModal = ({ closeModal }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      title: "Tutorial Step 1",
      content: "Welcome to the Pathfinding Visualizer! Here, you can visualize different pathfinding algorithms."
    },
    {
      title: "Tutorial Step 2",
      content: "Select an algorithm from the dropdown menu to get started."
    },
    {
      title: "Tutorial Step 3",
      content: "Click on the grid to set the start and end points."
    },
    {
      title: "Tutorial Step 4",
      content: "Press the 'Run' button to visualize the pathfinding process."
    }
  ];

  const handleClose = () => {
    closeModal(); // Call the passed closeModal function to close the modal
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{steps[currentStep].title}</h2>
        <p>{steps[currentStep].content}</p>
        {currentStep < steps.length - 1 ? (
          <button onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
        ) : (
          <button onClick={handleClose}>Close</button> // Close button calls handleClose
        )}
      </div>
    </div>
  );
};

export default TutorialModal;