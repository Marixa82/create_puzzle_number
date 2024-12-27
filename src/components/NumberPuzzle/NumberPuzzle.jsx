
import React, { useState} from "react";
import FileUploader from "../FileUploader";
import ResultDisplay from "../ResultDisplay/ResultDisplay";
import findSequence from "../../utils/findSequence";

const NumberPuzzle = () => {
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState([]);
  const [sequenceString, setSequenceString] = useState(""); // Для рядка результату
  const handleCalculate = () => {
    if (numbers.length === 0) {
      alert("Спочатку завантажте файл із числами.");
      return;
    }
    const { puzzlePieces, result } = findSequence(numbers); // Отримуємо обидва значення

    // Оновлюємо стан результату
    setResult(puzzlePieces);
    setSequenceString(result); // Оновлюємо рядок
  };
  
  return (
    <div className="puzzle">
      <h1>Цифровий Пазл</h1>
      <FileUploader onFileUpload={setNumbers} />
      <button onClick={handleCalculate}>Знайти Послідовність</button>
      <ResultDisplay result={result}/> 
      {sequenceString && (
        <div>
          <h2>З'єднаний Рядок:</h2>
          <p>{sequenceString}</p> {/* Виведення з'єднаного рядка */}
        </div>
      )}
    </div>
  );
}

export default NumberPuzzle;


// import React, { useState, useRef, useEffect} from "react";
// import FileUploader from "../FileUploader";
// import ResultDisplay from "../ResultDisplay/ResultDisplay";


// const NumberPuzzle = () => {
//   const [numbers, setNumbers] = useState([]);
//   const [result, setResult] = useState([]);
//   const workerRef = useRef(null);

//   useEffect(() => {
//     // Створюємо Web Worker з відносного шляху до public/workers/worker.js
//     workerRef.current = new Worker("/workers/worker.js");

//     // Обробка повідомлень від Worker
//     workerRef.current.onmessage = (e) => {
//       setResult(e.data); // Встановлюємо результат від Worker
//     };

//     // Завершення роботи Worker при демонтажі компонента
//     return () => {
//       workerRef.current.terminate();
//     };
//   }, []);

//   const handleCalculate = () => {
//     if (numbers.length === 0) {
//       alert("Спочатку завантажте файл із числами.");
//       return;
//     }

//     // Надсилаємо числа в Worker для обчислень
//     workerRef.current.postMessage(numbers);
//   };


//   return (
//     <div>
//       <h1>Цифровий Пазл</h1>
//       <FileUploader onFileUpload={setNumbers} />
//       <button onClick={handleCalculate}>Знайти Послідовність</button>
//       <ResultDisplay result={result} />
//     </div>
//   );
// };

// export default NumberPuzzle;



