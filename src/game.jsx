import React from 'react'
import { useEffect, useState } from 'react'


const TicTacToe = () => {

  const [count, setCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [isPlayer1, setIsPlayer1] = useState(true);

  const [player1Tiles, setPlayer1Tiles] = useState([]);
  const [player2Tiles, setPlayer2Tiles] = useState([]);

  const winningComb = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 5, 7], [4, 5, 6], [3, 6, 9], [7, 8, 9]];

  const refreshWindow = () => {
    window.location.reload()
  }

  const checkWin = (tiles) => {
    console.log('checking win')

    let status = winningComb.forEach(combination => {
      if (tiles.includes(combination[0])) {
        console.log("pass 1")
        if (tiles.includes(combination[1])) {
          console.log("pass 2")
          if (tiles.includes(combination[2])) {
            console.log("pass 3")
            setGameFinished(true);
          }
        }
      }
    })
    console.log('win checked')
  }

  useEffect(() => {
    checkWin(player1Tiles);
  }, [player1Tiles]);

  useEffect(() => {
    checkWin(player2Tiles);
  }, [player2Tiles]);

  const markTile = (e, num) => {
    console.log("tile mark begin")

    if (!gameFinished) {
      let symbol = null;
      isPlayer1 ? symbol = ("X") : symbol = ("O");

      if (!e.target.classList.contains("marked")) {
        e.target.append(symbol);
        e.target.classList.add("marked");
        if (isPlayer1) {
          e.target.classList.add("player1");
        } else {
          e.target.classList.add("player2");
        };
        isPlayer1 ? (
          setPlayer1Tiles([...player1Tiles, num])
        ) : (
          setPlayer2Tiles([...player2Tiles, num])
        );
        setIsPlayer1(!isPlayer1);
      }
    }

    console.log('mark tile end')
  }

  const checkTiles = () => {
    console.log("player 1")
    player1Tiles.forEach(sum => console.log(sum))
    console.log("player 2")
    player2Tiles.forEach(sum => console.log(sum))
  }

  const checkWins = () => {
    checkWin(player1Tiles);
    checkWin(player2Tiles);
  }


  return (
    <>
      {gameFinished ?
        <h1>COMPLETE</h1> :
        (isPlayer1 ? <h1>Player 1's Turn</h1> : <h1>Player 2's Turn</h1>)
      }
      <div id="board" className="board">
        <div className="row">
          <div className="tile" onClick={(e) => markTile(e, 1)}></div>
          <div className="tile" onClick={(e) => markTile(e, 2)}></div>
          <div className="tile" onClick={(e) => markTile(e, 3)}></div>
        </div>
        <div className="row">
          <div className="tile" onClick={(e) => markTile(e, 4)}></div>
          <div className="tile" onClick={(e) => markTile(e, 5)}></div>
          <div className="tile" onClick={(e) => markTile(e, 6)}></div>
        </div>
        <div className="row">
          <div className="tile" onClick={(e) => markTile(e, 7)}></div>
          <div className="tile" onClick={(e) => markTile(e, 8)}></div>
          <div className="tile" onClick={(e) => markTile(e, 9)}></div>
        </div>
      </div>

      <button onClick={refreshWindow}>Reset</button>

    </>
  );
}

export default TicTacToe