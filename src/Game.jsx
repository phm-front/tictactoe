import Board from "./components/Board";
import React, { memo, useRef } from "react";

export default memo(function Game() {
  const resetRef = useRef()
  const reStartGame = () => {
    resetRef.current.reStart()
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board resetRef={resetRef} />
      </div>
      <div className="game-info">
        <div>
          <button onClick={reStartGame}>regame</button>
        </div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
});
