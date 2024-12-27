import React from "react";


const FileUploader = ({ onFileUpload }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const loadedNumbers = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.match(/^\d{6}$/)) // Перевірка на шестизначні числа
          .map((line) => line.padStart(6, "0"));
        onFileUpload(loadedNumbers); // Виклик функції, переданої через пропс
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploader;
