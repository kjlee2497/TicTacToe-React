import React from 'react'
import { useEffect, useState } from 'react'


const TicTacToe = ({ onePlayerMode }) => {

  const [isCpuTurn, setIsCpuTurn] = useState(false);

  const [gameFinished, setGameFinished] = useState(false);
  const [isPlayer1, setIsPlayer1] = useState(true);

  const [player1Tiles, setPlayer1Tiles] = useState([]);
  const [player2Tiles, setPlayer2Tiles] = useState([]);

  
  const shuffle = (array) => {
    let currentIndex = array.length;    
    while (currentIndex != 0) {
      
      // Pick a remaining element
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
    return array; // Make sure to return the shuffled array
  }
  
  const winningCombs = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 5, 7], [4, 5, 6], [3, 6, 9], [7, 8, 9]];
  const winningComb = shuffle([...winningCombs]);

  const refreshWindow = () => {
    window.location.reload()
  }

  const comTurn = (tiles) => {
    if (!isCpuTurn) return;

    let moveMade = false;

    // CPU makes a random move if it's the first move
    if (tiles.length === 0) {
      const randNum = Math.floor(Math.random() * 9) + 1;
      document.getElementById(`tile${randNum}`).click();
      moveMade = true;
    } else {
      // Prioritize making a move in winning combinations with 2 matches
      for (const combination of winningComb) {
        const matches = tiles.filter(e => combination.includes(e));
        if (matches.length === 2) {
          for (const choice of combination) {
            const tile = document.getElementById(`tile${choice}`);
            if (tile && tile.classList.contains("unmarked")) {
              tile.click();
              moveMade = true;
              break;
            }
          }
        }
        if (moveMade) break; // Exit if a move was made
      }

      // If no prioritized move was made, make a move in any winning combination with at least 1 match
      if (!moveMade) {
        for (const combination of winningComb) {
          const matches = tiles.filter(e => combination.includes(e));
          if (matches.length >= 1) {
            for (const choice of combination) {
              const tile = document.getElementById(`tile${choice}`);
              if (tile && tile.classList.contains("unmarked")) {
                tile.click();
                moveMade = true;
                break;
              }
            }
          }
          if (moveMade) break; // Exit if a move was made
        }
      }


      if (moveMade) {
        setIsCpuTurn(false); // Change to player's turn
      }
    }

    if (moveMade) {
      setIsCpuTurn(false); // Change to player's turn
    }
  }


  const checkWin = (tiles) => {
    winningComb.forEach(combination => {
      if (tiles.includes(combination[0]) && tiles.includes(combination[1]) && tiles.includes(combination[2])) {
        setGameFinished(true);
      }
    })
  }

  // const checkWin = (tiles) => {
  //   console.log('checking win')

  //   winningComb.forEach(combination => {
  //     if (tiles.includes(combination[0])) {
  //       console.log("pass 1")
  //       if (tiles.includes(combination[1])) {
  //         console.log("pass 2")
  //         if (tiles.includes(combination[2])) {
  //           console.log("pass 3")
  //           setGameFinished(true);
  //         }
  //       }
  //     }
  //   })
  //   console.log('win checked')
  // }

  useEffect(() => {
    checkWin(player1Tiles);
  }, [player1Tiles]);

  useEffect(() => {
    checkWin(player2Tiles);
  }, [player2Tiles]);

  if (onePlayerMode) {
    useEffect(() => {
      setTimeout(() => comTurn(player2Tiles), 1250);
    }, [isCpuTurn]);
  }

  const markTile = (e, num) => {
    console.log("tile mark begin")

    if (!gameFinished && e.target.classList.contains("unmarked")) {
      // Set symbol as X or O pending on player, append, and set tile as marked
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

      setIsPlayer1(!isPlayer1);  // Change players
      
      if (!isCpuTurn) setIsCpuTurn(true); // only change if it's currently the human's turn (avoid endless useEffect)
    }
    console.log('mark tile end')
  }


  const checkCpuTurn = () => {
    if (isCpuTurn) {
      console.log("cpu turn")
    }
    else {
      console.log("player turn")
    }
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
      <button onClick={checkCpuTurn}>Check CPU Turn</button>

    </>
  );
}

export default TicTacToe