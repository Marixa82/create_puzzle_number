
 const findSequence = (numbers) => {
  const graph = buildGraph(numbers);
  let longestSequence = [];

  numbers.forEach((num) => {
    const path = findLongestPath(graph, num);
    if (path.length > longestSequence.length) {
      longestSequence = path;
    }
  });
  // Формуємо результат у вигляді 6-значних чисел
  const puzzlePieces = longestSequence.map((num) => String(num).padStart(6, "0"));

  // Якщо потрібно створити один великий рядок з числами:
  let result = String(puzzlePieces[0]); 
  for (let i = 1; i < puzzlePieces.length; i++) {
    result += String(puzzlePieces[i]).slice(2); // додаємо решту кожного наступного числа
  }

  // Повертаємо масив пазлів
  return { puzzlePieces, result }; // Повертаємо обидва результати
};
// Формуємо результат у вигляді 6-значних чисел
// const puzzlePieces = longestSequence.map(num => String(num).padStart(6, "0"));
  
// return puzzlePieces;

  // let result = String(longestSequence[0]).slice(0, 4);
  // for (const num of longestSequence) {
  //   result += String(num).slice(2);
  // }

  // return result;
// };

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
export default findSequence
