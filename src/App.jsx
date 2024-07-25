import { useEffect, useState } from 'react'
import './App.css'
import TicTacToe from './tictactoe';

// TODO:
// Separate logic for player1 player2 processes so that the code is easier to organize in that aspect
//  I.e. symbol, player1Tiles vs player2Tiles, etc

function App() {
const [startGame, setStartGame] = useState(false);
const [onePlayerMode, setOnePlayerMode] = useState(false);

const startOnePlayer = () => {
  setOnePlayerMode(true);
  setStartGame(true);
}

  return (
    <>
    {startGame ? 
    <TicTacToe onePlayerMode = {onePlayerMode} /> :
    <div className='start'>
      <span className="title">
          <h1 className="blue">Tic</h1>
          <h1 className="orange">Tac</h1>
          <h1 className="yellow">Toe</h1>
      </span>
      <button className="startButton" onClick={() => setStartGame(true)}>Start Game</button>
      <button className="startButton" onClick={() => startOnePlayer()}>Play CPU</button>
  </div>
    }
    </>


  );
}

export default App
