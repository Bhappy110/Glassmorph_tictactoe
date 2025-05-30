import { useState } from 'react';

function Square({value, onSquareClick}){
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
function Board({xIsNext, wrapSquares, onPlay}) {
  function handleClick(i) {
    if (wrapSquares[i] || calculateWinner(wrapSquares)) return;

    const nextWrapSquares = wrapSquares.slice();
    
    nextWrapSquares[i] = xIsNext ? 'X' : 'O';
    
    onPlay(nextWrapSquares);
  }

  const winner = calculateWinner(wrapSquares);
  let status = '';
  if (winner){
    status = 'Winner : ' + winner;
  }else{
    status = 'Next Player : ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
      <Square value={wrapSquares[0]} onSquareClick={()=>handleClick(0)}/>
      <Square value={wrapSquares[1]} onSquareClick={()=>handleClick(1)}/>
      <Square value={wrapSquares[2]} onSquareClick={()=>handleClick(2)}/>
      <Square value={wrapSquares[3]} onSquareClick={()=>handleClick(3)}/>
      <Square value={wrapSquares[4]} onSquareClick={()=>handleClick(4)}/>
      <Square value={wrapSquares[5]} onSquareClick={()=>handleClick(5)}/>
      <Square value={wrapSquares[6]} onSquareClick={()=>handleClick(6)}/>
      <Square value={wrapSquares[7]} onSquareClick={()=>handleClick(7)}/>
      <Square value={wrapSquares[8]} onSquareClick={()=>handleClick(8)}/>
    </div>
    </>
    
  )
}

export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];


  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  function handlePlay(nextWrapSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextWrapSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  const moves = history.map((wrapSquares, move) => {
    let description = '';
    if(move > 0) {
      description = 'Go to move #' + move;
    }else{
      description = 'Go to game Start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="container">
      <div className="backgroundBlob1"></div>
      <div className="backgroundBlob2"></div>
      <div className="backgroundBlob3"></div>
      <div className="wrapGame">
        <div className="title">Tic Tac Toe</div>
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} wrapSquares={currentSquares} onPlay={handlePlay}/>
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    </div>
    
  );
}

function calculateWinner(wrapSquares){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++){
  const [a,b,c] = lines[i];

    if (wrapSquares[a] && wrapSquares[a] === wrapSquares[b] && wrapSquares[a] === wrapSquares[c]){
      return wrapSquares[a];
    }
  }
  return false;
}



