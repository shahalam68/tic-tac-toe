/* eslint-disable react/jsx-key */
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white border border-gray-400 h-12 w-12 m-1 leading-9 text-lg"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xisNext, square, onPlay }) {
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next Player: " + (xisNext ? "X" : "O");
  }
  function handleClick(i) {
    if (square[i] || calculateWinner(square)) {
      return;
    }
    const nextSquars = square.slice();
    if (xisNext) {
      nextSquars[i] = "X";
    } else {
      nextSquars[i] = "O";
    }
    onPlay(nextSquars);
  }
  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={square[0]} onSquareClick={() => handleClick(0)}></Square>
        <Square value={square[1]} onSquareClick={() => handleClick(1)}></Square>
        <Square value={square[2]} onSquareClick={() => handleClick(2)}></Square>
      </div>

      <div className="flex">
        <Square value={square[3]} onSquareClick={() => handleClick(3)}></Square>
        <Square value={square[4]} onSquareClick={() => handleClick(4)}></Square>
        <Square value={square[5]} onSquareClick={() => handleClick(5)}></Square>
      </div>
      <div className="flex">
        <Square value={square[6]} onSquareClick={() => handleClick(6)}></Square>
        <Square value={square[7]} onSquareClick={() => handleClick(7)}></Square>
        <Square value={square[8]} onSquareClick={() => handleClick(8)}></Square>
      </div>
    </>
  );
}
// appp cxvmgg
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xisNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquars) {
    setXIsNext(!xisNext);
    const nextHitory = [...history.slice(0, currentMove + 1), nextSquars];
    setHistory(nextHitory);
    setCurrentMove(nextHitory.length - 1);
  }
  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }
  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = `Go To the move # ${move} `;
    } else {
      description = `Go to Start the Game`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div>
      <div>
        <Board
          xisNext={xisNext}
          square={currentSquares}
          onPlay={handlePlay}
        ></Board>
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
