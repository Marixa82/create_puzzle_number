import React from "react";
import "./ResultDisplay.css";  // Підключаємо стилі для пазлів

const ResultDisplay = ({ result }) => {
  if (result.length === 0) return null;
  
  return (
    <div className="puzzle-container">
      {result.map((puzzlePiece, index) => (
        <div key={index} className="puzzle-piece">
          {puzzlePiece}
        </div>
      ))}
    </div>
  );
};

export default ResultDisplay;
