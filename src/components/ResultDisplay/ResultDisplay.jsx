import React from "react";
import "./ResultDisplay.css";  

const ResultDisplay = ({ result }) => {
  if (!result || result.length === 0) return null;
  const getRandomColor = () => {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomHex.padStart(6, "0")}`;
  };
    
  return (
    <div className="puzzle-container">
      {result.map((puzzlePiece, index) => (
        <div key={index} className="puzzle-piece" style={{ backgroundColor: getRandomColor(puzzlePiece) }}>
          {puzzlePiece}
        </div>
      ))}
    </div>
  );
};

export default ResultDisplay;
