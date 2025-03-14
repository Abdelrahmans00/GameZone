import React, { useState } from "react";
import "./ConnectFour.css";
import { useNavigate } from 'react-router-dom';

const ROWS = 6;
const COLS = 7;

const ConnectFour = () => {
    const navigate = useNavigate();
    const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState("red");
    const [winner, setWinner] = useState(null);

  const dropPiece = (col) => {
    if (winner) return;
    const newBoard = [...board.map(row => [...row])];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        checkWinner(newBoard, row, col, currentPlayer);
        setCurrentPlayer(currentPlayer === "red" ? "blue" : "red");
        return;
      }
    }
  };

  const checkWinner = (board, row, col, player) => {
    const directions = [
      [[1, 0], [-1, 0]],  // Vertical
      [[0, 1], [0, -1]],  // Horizontal
      [[1, 1], [-1, -1]], // Diagonal \
      [[1, -1], [-1, 1]]  // Diagonal /
    ];
    
    for (let [[dr1, dc1], [dr2, dc2]] of directions) {
      let count = 1;
      count += countDirection(board, row, col, dr1, dc1, player);
      count += countDirection(board, row, col, dr2, dc2, player);
      if (count >= 4) {
        setWinner(player);
        return;
      }
    }
  };

  const countDirection = (board, row, col, dr, dc, player) => {
    let count = 0;
    let r = row + dr, c = col + dc;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;
      r += dr;
      c += dc;
    }
    return count;
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setCurrentPlayer("red");
    setWinner(null);
  };

  return (
    <div className="connect-four bg-gray-600 p-3.5">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Connect Four</h1>
      {winner ? <h2 className="text-lg text-gray-700 dark:text-gray-300 text-center">{winner.toUpperCase()} Wins!</h2> : <h2 className="text-lg text-gray-700 dark:text-gray-300 text-center">Turn: {currentPlayer.toUpperCase()}</h2>}
      <div className="board">
        {Array(COLS).fill(null).map((_, colIndex) => (
          <div key={colIndex} className="column" onClick={() => dropPiece(colIndex)}>
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className={`cell ${row[colIndex]}`}>
              </div>
            ))}
          </div>    
        ))}
      </div>
      <button onClick={resetGame} className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Restart</button>
      <button 
          onClick={() => navigate("/")} 
          className="back-home-btn m-4"
        >
          ⬅ Back Home
        </button>
    </div>
  );
};

export default ConnectFour;
