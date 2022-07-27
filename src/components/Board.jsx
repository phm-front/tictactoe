import React, { memo, useState, useCallback, useEffect, useImperativeHandle } from "react";
import Square from "./Square";

const Board = memo((props) => {
  const { resetRef } = props

  const [symbol, setSymbol] = useState("X");
  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [winner, setWinner] = useState(null)
  // btn 点击事件
  const handleBtnClick = useCallback(
    (i) => {
      if (winner) return
      setSquares(squares.map((item, index) => (index === i ? symbol : item)));
      setSymbol(symbol === "X" ? "O" : "X");
    },
    [symbol, squares, winner]
  );
  useImperativeHandle(resetRef, () => {
    return {
      reStart: reStartGame
    }
  })
  // 重新开始游戏
  const reStartGame = () => {
    setSymbol('X')
    setSquares(new Array(9).fill(null))
    setWinner(null)
  }
  // 监听squares变化
  useEffect(() => {
    let res = calculateWinner(squares)
    let remain = squares.filter(item => item === null).length
    if (remain) {
      setWinner(res)
    } else if (res === null) {
      setWinner('draw')
    }
  }, [squares])
  const renderSquare = (i) => {
    return <Square value={squares[i]} clickEvent={() => handleBtnClick(i)} />;
  };
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  return (
    <div>
      <div className="status">
        {winner ? `winner: ${winner}` : `Next player: ${symbol}`}
      </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
});

export default Board;
