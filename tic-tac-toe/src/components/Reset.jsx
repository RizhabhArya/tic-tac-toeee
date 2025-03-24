import React from "react";
import "../stylesheets/Reset.css";

function Reset({ setCount, setWin, setTurn, chkarray, setWinPattern, setBoard }) {
  function reset() {
    setCount(0);
    setWin(null);
    setTurn("X");
    setWinPattern([]);
    chkarray.current = []; // ✅ Clear moves history
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null))); // ✅ Reset board
  }

  return (
    <button className="reset" onClick={reset}>
      Reset
    </button>
  );
}

export default Reset;
