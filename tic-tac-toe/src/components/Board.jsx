import { useEffect,useState, useRef } from "react";
import "../stylesheets/Board.css";
import Square from "./Square";

function Board() {
  const [turn, setTurn] = useState("X"); // Track turn globally
  const [win, setWin] = useState(null); // Track winner
  const chkarray = useRef([]); // ✅ Shared array for tracking moves
  const [winPattern, setWinPattern] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (win && count == 9) {
      setCount(count => count + 1);
    }
  }, [win]); // Runs only when 'win' changes

  return (
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
            />
          ))}
        </div>
      ))}
      <div className="winner">
      {win && <h1 className="winner-text">Winner {win} </h1>}
      {count == 9 && <h1 className="winnner-text">DRAW</h1>}
      </div>
    </div>
  );
}

export default Board;
