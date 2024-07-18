import React from 'react'
import { useEffect, useState } from 'react'


const TicTacToe = () => {

  const [isCpuTurn, setIsCpuTurn] = useState(false);
  const [clickDisabled, setClickDisabled] = useState(false);
  const [onePlayerMode, setOnePlayerMode] = useState(true);

  const [gameFinished, setGameFinished] = useState(false);
  const [isPlayer1, setIsPlayer1] = useState(true);

  const [player1Tiles, setPlayer1Tiles] = useState([]);
  const [player2Tiles, setPlayer2Tiles] = useState([]);

  const winningComb = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5,                                                                8], [3, 5, 7], [4, 5, 6], [3, 6, 9], [7, 8, 9]];


  const refreshWindow = () => {
    window.location.reload()
  }

  const comTurn = (tiles) => {
    if(tiles.length == 0 && isCpuTurn) {
      const randNum = Math.floor(Math.random() * 9) + 1;
      document.getElementById(`tile${randNum}`).click();
    } else {
      winningComb.forEach(combination => {
        const matches = tiles.filter(e => combination.includes(e)).length;
        if(matches >= 1) {
          for(let i=0; i < 2; i++) {
            if(document.getElementById(`tile${combination[i]}`).classList.contains("unmarked")) {
              document.getElementById(`tile${combination[i]}`).click();
              return;
            }
          }
        }
      })
    };
  }

  const checkWin = (tiles) => {
    console.log('checking win')

    winningComb.forEach(combination => {
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

  if(onePlayerMode){
  useEffect(() => {
    comTurn(player2Tiles);
  }, [isCpuTurn == true]);
  }
  
  const markTile = (e, num) => {
    console.log("tile mark begin")

    if (!gameFinished && e.target.classList.contains("unmarked")) {
      const symbol = isPlayer1 ? ("X") : ("O");

        e.target.append(symbol);
        e.target.classList.remove("unmarked");
        e.target.classList.add("marked");
        
        if (isPlayer1) {
          e.target.classList.add("white");
          setPlayer1Tiles([...player1Tiles, num]);
        } else {
          e.target.classList.add("orange");
          setPlayer2Tiles([...player2Tiles, num]);
        };

        console.log(isCpuTurn);
        setIsCpuTurn(isCpuTurn => !isCpuTurn);
        setIsPlayer1(isPlayer1 => !isPlayer1);
        
      }
      
      console.log(isCpuTurn);
    console.log('mark tile end')
  }


  return (
    <>
      {gameFinished ?
        <h1 className="white">WINNER!!</h1> :
        (isPlayer1 ? <h1 className="white">Player 1's Turn</h1> : <h1 className="orange">Player 2's Turn</h1>)
      }
      <div id="board" className="board">
        <div className="row">
          <div id="tile1" className="tile unmarked top left" onClick={(e) => markTile(e, 1)}></div>
          <div id="tile2" className="tile unmarked top" onClick={(e) => markTile(e, 2)}></div>
          <div id="tile3" className="tile unmarked top right" onClick={(e) => markTile(e, 3)}></div>
        </div>
        <div className="row">
          <div id="tile4" className="tile unmarked mid left" onClick={(e) => markTile(e, 4)}></div>
          <div id="tile5" className="tile unmarked mid" onClick={(e) => markTile(e, 5)}></div>
          <div id="tile6" className="tile unmarked mid right" onClick={(e) => markTile(e, 6)}></div>
        </div>
        <div className="row">
          <div id="tile7" className="tile unmarked bottom left" onClick={(e) => markTile(e, 7)}></div>
          <div id="tile8" className="tile unmarked bottom" onClick={(e) => markTile(e, 8)}></div>
          <div id="tile9" className="tile unmarked bottom right" onClick={(e) => markTile(e, 9)}></div>
        </div>
      </div>

      <button onClick={refreshWindow}>Reset</button>

    </>
  );
}

export default TicTacToe