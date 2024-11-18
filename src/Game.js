import React, { useState } from "react";
import GameGrid from "./GameGrid.js";
import './styles.css';

function Game() {
   const [moves, setMoves] = useState(new Array(9).fill(""));
   const [turn, setTurn] = useState("X");
   const [gameOver, setGameOver] = useState(false); // Track if the game is over
   const [winner, setWinner] = useState(null); // Track the winner

   // Function to check for a winner
   function checkWinner(moves) {
      const winningCombinations = [
         [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
         [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
         [0, 4, 8], [2, 4, 6] // Diagonals
      ];

      for (let combination of winningCombinations) {
         const [a, b, c] = combination;
         if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
            return moves[a]; // Return "X" or "O" as the winner
         }
      }
      return null;
   }

   // Function to check for a tie
   function checkTie(moves) {
      return moves.every(move => move !== ""); // Returns true if all squares are filled
   }

   function gridClick(whichSquare) {
      if (gameOver || moves[whichSquare] !== "") {
         return; // Prevent click if game is over or square is already filled
      }

      const newMoves = [...moves];
      newMoves[whichSquare] = turn;
      setMoves(newMoves);

      const winner = checkWinner(newMoves);
      if (winner) {
         setGameOver(true);
         setWinner(winner);
      } else if (checkTie(newMoves)) {
         setGameOver(true);
         setWinner("Tie");
      } else {
         setTurn(turn === "X" ? "O" : "X");
      }
   }

   function newGame() {
      setMoves(new Array(9).fill(""));
      setTurn("X");
      setGameOver(false);
      setWinner(null);
   }

   return (
      <>
         <h1>Tic-Tac-Toe</h1>
         <GameGrid moves={moves} click={gridClick} />
         <p>
            {gameOver ? (winner === "Tie" ? "It's a tie!" : `${winner} wins!`) : `Turn: ${turn}`}
         </p>
         <p>
            <button onClick={newGame}>New Game</button>
         </p>
      </>
   );
}

export default Game;
