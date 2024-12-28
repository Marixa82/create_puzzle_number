import React, { useState, useRef} from "react";
import FileUploader from "../FileUploader/FileUploader";
import ResultDisplay from "../ResultDisplay/ResultDisplay";
import findSequence from "../../utils/findSequence";
import { PulseLoader } from "react-spinners";
import './NumberPuzzle.css';


const NumberPuzzle = () => {
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState([]);
  const [sequenceString, setSequenceString] = useState(""); // Для рядка результату
  const [loading, setLoading] = useState(false); 
  const fileInputRef = useRef(null); 

  const handleCalculate = async () => {
    if (!numbers || numbers.length === 0) {
      alert("Спочатку завантажте файл із числами.");
      return;
    }

    setLoading(true);

    // Емуляція асинхронного обчислення
    setTimeout(() => {
      const { puzzlePieces, result } = findSequence(numbers);

      // Оновлюємо стан результату
      setResult(puzzlePieces);
      setSequenceString(result); // Оновлюємо рядок

      setLoading(false); // Вимкнути лоадер
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }, 1000); // Емуляція затримки (1 секунда)
  };
  
  
  return (
    <div >
      <h1 className="puzzle-title">Цифровий Пазл</h1>
      <div className="puzzle-header">
        <FileUploader onFileUpload={setNumbers} inputRef={fileInputRef}/>
        <button onClick={handleCalculate}>Знайти Послідовність</button>
      </div>
     
      <div className="puzzle-container">
        {loading ? (
          <div className="loader">
            <PulseLoader color="#0909db" size={15} />
            <p className="puzzle-loader">Йде пошук співпадінь, зачекайте...</p>
          </div>
        ) : (
          <>
            <ResultDisplay result={result} />
            {sequenceString && (
              <div className="number-container">
                <h2 className="puzzle-title">З'єднаний Рядок:</h2>
                <p className="number-sequence">{sequenceString}</p> {/* Виведення з'єднаного рядка */}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NumberPuzzle;


