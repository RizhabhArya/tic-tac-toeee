import { useState } from "react";
import "../stylesheets/Square.css";

function Square({ count,setCount, win, setWin, turn, setTurn, row, col, chkarray, winPattern, setWinPattern }) {
  const [sign, setSign] = useState(null);

  const handleClick = () => {
    if (sign || win) return; // Prevent overwriting moves or playing after win
    setSign(turn);
    chkarray.current.push([row, col, turn]); // ✅ Store move in shared array
    setCount(count => count + 1);
    checkWinner();
    setTurn(turn === "X" ? "O" : "X"); // Switch turn
  };

  const winarray = [
    // Row Wins
    [[0, 0, "X"], [0, 1, "X"], [0, 2, "X"]],
    [[1, 0, "X"], [1, 1, "X"], [1, 2, "X"]],
    [[2, 0, "X"], [2, 1, "X"], [2, 2, "X"]],
    [[0, 0, "O"], [0, 1, "O"], [0, 2, "O"]],
    [[1, 0, "O"], [1, 1, "O"], [1, 2, "O"]],
    [[2, 0, "O"], [2, 1, "O"], [2, 2, "O"]],
    // Column Wins
    [[0, 0, "X"], [1, 0, "X"], [2, 0, "X"]],
    [[0, 1, "X"], [1, 1, "X"], [2, 1, "X"]],
    [[0, 2, "X"], [1, 2, "X"], [2, 2, "X"]],
    [[0, 0, "O"], [1, 0, "O"], [2, 0, "O"]],
    [[0, 1, "O"], [1, 1, "O"], [2, 1, "O"]],
    [[0, 2, "O"], [1, 2, "O"], [2, 2, "O"]],
    // Diagonal Wins
    [[0, 0, "X"], [1, 1, "X"], [2, 2, "X"]],
    [[0, 2, "X"], [1, 1, "X"], [2, 0, "X"]],
    [[0, 0, "O"], [1, 1, "O"], [2, 2, "O"]],
    [[0, 2, "O"], [1, 1, "O"], [2, 0, "O"]]
  ];

  function checkWinner() {
    for (let winPattern of winarray) {
      if (winPattern.every(winMove =>
        chkarray.current.some(move =>
          move[0] === winMove[0] && move[1] === winMove[1] && move[2] === winMove[2]
        )
      )) {
        console.log(`Winner is: ${winPattern[0][2]}`);
        console.log("win pattern: ", winPattern);
        setWin(winPattern[0][2]); // ✅ Store winner
        setWinPattern(winPattern.map(([x, y]) => `${x}-${y}`)); // Store winning positions
        return;
      }
    }
  }

  const isWinningSquare = winPattern.includes(`${row}-${col}`);

  return (
    <button
      className="square"
      style={{
        backgroundColor: isWinningSquare ? "cyan" : "#fff", // Highlight winning squares
        color: isWinningSquare ? "black" : "inherit",
      }}
      onClick={handleClick}
    >
      <h1 className="sign">{sign}</h1>
    </button>
  );
}

export default Square;
