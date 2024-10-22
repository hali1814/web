import {  App, Button, Switch } from 'antd';
import { useEffect, useState } from 'react';

function Square({ value, onSquareClick, highlight } : any) {
  return (
    <button
      style={{
        borderWidth: 1,
        borderColor: 'black',
        width: 100,
        height: 100,
        fontSize: '1.8rem',
        backgroundColor: highlight ? 'green' : undefined,
      }}
      onClick={onSquareClick}
    >
      <div style={{ color: value === 'X' ? 'red' : 'blue' }}>{value}</div>
    </button>
  );
}

export default function TicTacToe() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState<any>([]); 
  const [ascending, setAscending] = useState(true);
  const { modal } = App.useApp();

  function handleClick(i : number) {
    console.log(i)
    if (squares[i] || calculateWinner(squares)?.line) return;

    const nextSquares = squares.slice();
    const player = xIsNext ? 'X' : 'O';
    nextSquares[i] = player;

    setSquares(nextSquares);
    setHistory([...history, { player, position: [Math.floor(i / 3), i % 3] }]);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner.squares;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  useEffect(() => {
    if (squares.filter(e => e).length === squares.length && !winner) {
      alert('Hoà')

      return;
    }
  }, [squares, modal, winner]);


  const sortedHistory = ascending 
    ? history 
    : [...history].reverse();

  return (
    <div className='flex flex-1 justify-center'>
      <div>
        <div className="status">{status}</div>
        <Button onClick={() => {
          setSquares(Array(9).fill(null));
          setHistory([]);
        }}>Reset</Button>

       

        {Array(3).fill(null).map((_, row) => (
          <div className="flex flex-row" style={{
            display: 'flex',
            flexDirection: 'row'
          }} key={row}>
            {Array(3).fill(null).map((_, col) => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  highlight={winner?.line?.includes(index)}
                />
              );
            })}
          </div>
        ))}



        <Switch defaultChecked onChange={() => setAscending(!ascending)} /> Sort Moves: {ascending ? 'Descending' : 'Ascending'}




        <div>
          <h3>Move History:</h3>
          <ul>
            {sortedHistory.map((move : any, index : any) => (
              <li key={index}>
                Player {move.player} at position ({move.position[0]}, {move.position[1]})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares : any) {
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
      return {
        line: lines[i],
        squares: squares[a]
      };
    }
  }
  return null;
}
