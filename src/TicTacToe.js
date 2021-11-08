import { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { Box } from "./Box";

export function TicTacToe() {
  const INITIAL_BOARD_STATE = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  // const [board, setBoard] = useState(INITIAL_BOARD_STATE);
  // const[ isXturn, setIsXturn] = useState(true)
  const decideWinner = () => {
    const WINNIG_CONDITION = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    //const[winner, setWinner] = useState(null)
    for (let i = 0; i < WINNIG_CONDITION.length; i++) {
      let [a, b, c] = WINNIG_CONDITION[i];
      if (board[a] != null && board[a] === board[b] && board[b] === board[c]) {
        //   setWinner(board[a])
        console.log("Winner is " + board[a]);
        return board[a];
      }
    }

    let isNotNull = true;
    for (let i = 0; i < board.length; i++) {
      if (board[i] !== null) {
        continue;
      } else {
        isNotNull = false;
        break;
      }
    }
    return isNotNull ? "No One, Its a Draw" : null;
  };

  const [board, setBoard] = useState(INITIAL_BOARD_STATE);
  const winner = decideWinner();

  const [isXturn, setIsXturn] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleClick = (index) => {
    if (!isGameStarted) {
      setIsGameStarted(true);
    }
    if (!winner && !board[index]) {
      let boardCopy = [...board];
      boardCopy[index] = isXturn ? "X" : "O";
      setBoard(boardCopy);
      setIsXturn(!isXturn);
    }
  };
  const reset = () => {
    setBoard(INITIAL_BOARD_STATE);
    setIsXturn(true);
    setIsGameStarted(false);
  };

  const selectPlayer = () => {
    console.log("function invoked");
    if (!isGameStarted) {
      setIsXturn(!isXturn);
    }
  };
  const style = isGameStarted ? { visibility: "hidden" } : { visibility: "" };
  const { width, height } = useWindowSize();
  return (
    <>
      {winner ? <Confetti width={width} height={height} /> : ""}
      <h4>Select Player 1</h4>
      <select style={style} onChange={selectPlayer}>
        <option value="X"> X </option>
        <option value="O"> O </option>
      </select>
      <div className="gridBox">
        {board.map((e, index) => {
          return <Box val={e} playerClick={() => handleClick(index)} />;
        })}
      </div>
      {winner ? <h3>Winner : {winner}</h3> : ""}
      {isXturn ? <h4>X's turn</h4> : <h4>O's turn </h4>}
      <br />
      <button onClick={() => reset()}>Reset</button>
    </>
  );
}
