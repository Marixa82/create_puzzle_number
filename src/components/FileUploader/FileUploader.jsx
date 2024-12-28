import React, { forwardRef} from "react";


const FileUploader = forwardRef(({ onFileUpload }, ref) => {
  // const [fileName, setFileName] = useState("");
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Будь ласка, виберіть файл.");
      return;
    }
    // setFileName(file.name);
    const chunkSize = 1024 * 1024; // Розмір частини, наприклад, 1 МБ
    let offset = 0;
    const reader = new FileReader();
    const numbers = [];

    // Обробка кожної частини
    reader.onload = (event) => {
      const chunk = event.target.result;
      const lines = chunk.split("\n").map((line) => line.trim());
      numbers.push(...lines.filter((line) => /^\d{6}$/.test(line)));

      offset += chunkSize;

      if (offset < file.size) {
        readNextChunk(); // Читаємо наступну частину
      } else {
        onFileUpload(numbers); // Передаємо весь оброблений масив
      }
    };

    // Читаємо наступну частину файлу
    const readNextChunk = () => {
      const blob = file.slice(offset, offset + chunkSize);
      reader.readAsText(blob);
    };

    readNextChunk(); // Стартуємо з першої частини
  };

  return (
    
      <div className="file-uploader">
      
      <input
        
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        ref={ref}
        className="hidden-file-input"
      />
    </div>
  );
});

export default FileUploader;
