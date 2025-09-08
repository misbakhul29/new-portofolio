import React, { useState } from 'react';

const Square: React.FC<{ value: string | null; onSquareClick: () => void }> = ({ value, onSquareClick }) => {
  const playerColor = value === 'X' ? 'text-cyan-400' : 'text-pink-400';
  return (
    <button
      className={`w-20 h-20 sm:w-24 sm:h-24 bg-slate-900/40 border-2 border-slate-700/80 font-bold text-4xl flex items-center justify-center transition-colors duration-200 hover:bg-slate-800/60 ${playerColor}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

const TicTacToe: React.FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (currentSquares: (string | null)[]) => {
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
      if (currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
        return currentSquares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a Draw!";
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  const handleClick = (i: number) => {
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? 'X' : 'O';
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-semibold text-white mb-6">{status}</div>
      <div className="grid grid-cols-3">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button
        onClick={handleRestart}
        className="mt-8 bg-cyan-500 text-black font-semibold px-6 py-2 rounded-md hover:bg-cyan-600 transition-colors duration-300"
      >
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;