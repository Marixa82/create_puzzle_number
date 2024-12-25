
import React, { useState } from "react";

const NumberPuzzle = () => {
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState("");
//   const fileInputRef = useRef(null);
  // Логіка для обчислення послідовності
  const findSequence = (numbers) => {
    const graph = buildGraph(numbers);
    let longestSequence = [];

    numbers.forEach((num) => {
      const path = findLongestPath(graph, num);
      if (path.length > longestSequence.length) {
        longestSequence = path;
      }
    });

    let result = String(longestSequence[0]).slice(0, 4);
    for (const num of longestSequence) {
      result += String(num).slice(2);
    }

    return result;
  };

  const buildGraph = (numbers) => {
    const graph = {};
    numbers.forEach((num) => {
      const suffix = String(num).slice(-2);
      graph[num] = [];
      numbers.forEach((other) => {
        const prefix = String(other).slice(0, 2);
        if (suffix === prefix) {
          graph[num].push(other);
        }
      });
    });
    return graph;
  };

  const findLongestPath = (graph, start) => {
    let maxPath = [];
    const stack = [[start, [start]]];

    while (stack.length > 0) {
      const [current, path] = stack.pop();

      graph[current].forEach((neighbor) => {
        if (!path.includes(neighbor)) {
          stack.push([neighbor, [...path, neighbor]]);
        }
      });

      if (path.length > maxPath.length) {
        maxPath = path;
      }
    }

    return maxPath;
  };

  // Обробка завантаження файлу
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
          .map(Number);
        setNumbers(loadedNumbers);
      };
      reader.readAsText(file);
    }
  };

  // Обчислення результату
  const handleCalculate = () => {
    if (numbers.length === 0) {
      alert("Спочатку завантажте файл із числами.");
      return;
    }
    const puzzleResult = findSequence(numbers);
    setResult(puzzleResult);
    // clearForm();
  };
//   const clearForm = () => {
//           setNumbers([]);
//           fileInputRef.current.value = ""; // Очищаємо значення файлу
//         };
  return (
    <div>
      <h1>Цифровий Пазл</h1>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <button onClick={handleCalculate}>Знайти Послідовність</button>
      {result && <p>Результат: {result}</p>}
    </div>
  );
};

export default NumberPuzzle;

