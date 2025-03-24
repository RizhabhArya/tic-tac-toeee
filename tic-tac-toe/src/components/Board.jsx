import { useEffect, useState, useRef } from "react";
import "../stylesheets/Board.css";
import Square from "./Square";
import Reset from "./Reset";

function Board() {
  const [turn, setTurn] = useState("X"); // Track turn globally
  const [win, setWin] = useState(null); // Track winner
  const chkarray = useRef([]); // ✅ Shared array for tracking moves
  const [winPattern, setWinPattern] = useState([]);
  const [count, setCount] = useState(0);

  // ✅ Store board as a 3x3 array (each square's sign is stored separately)
  const [board, setBoard] = useState(Array(3).fill(null).map(() => Array(3).fill(null)));

  useEffect(() => {
    if (win && count === 9) {
      setCount((count) => count + 1);
    }
  }, [win]); // Runs only when 'win' changes

  return (
    <div>

      <div className="board">
        {[...Array(3)].map((_, rowIndex) => (
          <div className="row" key={rowIndex}>
            {[...Array(3)].map((_, colIndex) => (
              <Square
                key={`${rowIndex}-${colIndex}`}
                turn={turn}
                setTurn={setTurn}
                row={rowIndex}
                col={colIndex}
                win={win}
                setWin={setWin}
                winPattern={winPattern}
                setWinPattern={setWinPattern}
                count={count}
                setCount={setCount}
                chkarray={chkarray} // ✅ Pass shared reference
                board={board}
                setBoard={setBoard} // ✅ Pass board state to manage squares separately
              />
            ))}
          </div>
        ))}
        
      </div>

      <Reset
        setCount={setCount}
        setWin={setWin}
        setTurn={setTurn}
        chkarray={chkarray}
        setWinPattern={setWinPattern}
        setBoard={setBoard} // ✅ Reset the entire board instead of a single sign
      />
                <div className="winner">
          {win && <h1 className="winner-text">Winner {win} </h1>}
          {count === 9 && <h1 className="winner-text">DRAW</h1>}
        </div>
    </div>
  );
}

export default Board;
