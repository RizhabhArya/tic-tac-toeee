import "../stylesheets/Square.css";

function Square({ board, setBoard, turn, setTurn, row, col, win, setWin, chkarray, winPattern, setWinPattern, setCount, count }) {

  const handleClick = () => {
    if (board[row][col] || win) return; // Prevent overwriting moves or playing after win

    const newBoard = board.map((r) => [...r]); // Copy board
    newBoard[row][col] = turn; // Set the clicked square
    setBoard(newBoard); // Update state

    chkarray.current.push([row, col, turn]); // ✅ Store move in shared array
    setCount(count + 1);
    checkWinner(newBoard); // Pass new board for winner check
    setTurn(turn === "X" ? "O" : "X"); // Switch turn
  };

  function checkWinner(boardState) {
    const winarray = [
      // Row Wins
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Column Wins
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonal Wins
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (let pattern of winarray) {
      const [a, b, c] = pattern;
      if (boardState[a[0]][a[1]] && boardState[a[0]][a[1]] === boardState[b[0]][b[1]] && boardState[a[0]][a[1]] === boardState[c[0]][c[1]]) {
        setWin(boardState[a[0]][a[1]]); // ✅ Store winner
        setWinPattern(pattern.map(([x, y]) => `${x}-${y}`)); // Store winning positions
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
      <h1 className="sign">{board[row][col]}</h1> {/* ✅ Display board state */}
    </button>
  );
}

export default Square;
