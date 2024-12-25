
  import React, { useState, useRef, useMemo, useEffect, useCallback} from "react";

const NumberPuzzle = () => {
  const [numbers, setNumbers] = useState([]);
  const [result, setResult] = useState("");
  const fileInputRef = useRef(null); // Реф для інпуту файлу
  // Логіка для обчислення послідовності
  const findSequence = useCallback((numbers) => {
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
  }, []); // empty dependency array means it's memoized across renders

  // Обчислення результату за допомогою useMemo
  const puzzleResult = useMemo(() => findSequence(numbers), [numbers, findSequence]);

  // Оновлення результату за допомогою useEffect
  useEffect(() => {
    setResult(puzzleResult);
  }, [puzzleResult]);

  // Обробка завантаження файлу
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const numArray = content
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.match(/^\d{6}$/)); // Залишаємо лише шестизначні числа
        setNumbers(numArray);
      };
      reader.readAsText(file);
    }
  };

  // Очищення форми після обчислень
  const clearForm = () => {
    setNumbers([]);
    fileInputRef.current.value = ""; // Очищаємо значення файлу
  };

  const handleCalculate = () => {
    clearForm(); // Очищаємо форму після обчислень
  };

  return (
    <div>
      <h1>Цифровий Пазл</h1>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
      <button onClick={handleCalculate}>Знайти Послідовність</button>
      {result && <p>Результат: {result}</p>}
    </div>
  );
};

  

export default NumberPuzzle;

