import React from "react";
import { status } from "..";
import { Board } from "./Board";

export class FootballBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footballBoard: props.footballBoard,
      summaryBoard: [props.footballBoard[0]]
    };
  }

  componentDidMount() {
    let time = 0;

    // This interval has the logic to update all the matches each 5 seconds
    const footballInterval = setInterval(() => {
      let newBoard = matchLogic(time++, this.state.footballBoard, this.props.footballBoard);
      let newState = summaryLogic(newBoard, this.state.summaryBoard);
      this.setState({
        footballBoard: newState[0],
        summaryBoard: newState[1]
      });
    }, 5000);

    setTimeout(() => clearInterval(footballInterval), 30000);
  }

  render() {
    let summary = (this.state.summaryBoard?.length > 1) ? (
      <div  data-testid="summary">
        <h1>{'Summary'}</h1>
        <Board boardData={this.state.summaryBoard} />
      </div>
    ) : '';

    let mainBoard = (this.state.footballBoard?.length > 1) ? (
      <div data-testid="match">
        <h1>{'Matches'}</h1>
        <Board boardData={this.state.footballBoard} />
      </div>
    ) : '';

    return (
      <React.Fragment>
        {mainBoard}
        {summary}
      </React.Fragment>
    );
  }
}

// Function to update the data for the matches
function matchLogic(loop, board, mainBoard) {
  let boardUpdate = [...board];
  switch(loop) {
    case 0: 
      boardUpdate[1] = updateMatch(mainBoard[1], "18:00", '', 0);
      boardUpdate[2] = updateMatch(mainBoard[2], "19:00", '', 0);
      boardUpdate[3] = updateMatch(mainBoard[3], "HalfTime", '0-0', 2);
      boardUpdate[4] = updateMatch(mainBoard[4], "0'", '0-0', 1);
      boardUpdate[5] = updateMatch(mainBoard[5], "50'", '3-0', 3);
      break;
    case 1: 
      boardUpdate[1] = updateMatch(mainBoard[1], "0'", '0-0', 1);
      boardUpdate[2] = updateMatch(mainBoard[2], "19:00", '', 0);
      boardUpdate[3] = updateMatch(mainBoard[3], "50'", '2-2', 3);
      boardUpdate[4] = updateMatch(mainBoard[4], "HalfTime", '3-4', 2);
      boardUpdate[5] = updateMatch(mainBoard[5], "15:00", '3-1', 4);
      break;
    case 2: 
      boardUpdate[1] = updateMatch(mainBoard[1], "HalfTime", '0-3', 2);
      boardUpdate[2] = updateMatch(mainBoard[2], "0'", '0-0', 1);
      boardUpdate[3] = updateMatch(mainBoard[3], "16:00", '2-2', 4);
      boardUpdate[4] = updateMatch(mainBoard[4], "50'", '4-4', 3);
      break;
    case 3: 
      boardUpdate[1] = updateMatch(mainBoard[1], "50'", '0-4', 3);
      boardUpdate[2] = updateMatch(mainBoard[2], "HalfTime", '8-0', 2);
      boardUpdate[3] = updateMatch(mainBoard[4], "17:00", '6-6', 4);
      break;
    case 4: 
      boardUpdate[1] = updateMatch(mainBoard[1], "18:00", '0-5', 4);
      boardUpdate[2] = updateMatch(mainBoard[2], "50'", '9-0', 3);
      break;
    default:
      boardUpdate[1] = updateMatch(mainBoard[2], "19:00", '10-2', 4);
      break;
  }

  return boardUpdate;
}

// Function that remove from main board the matches ended, adding this ones for summary board
function summaryLogic(board, summaryBoard) {
  board = board.filter((match) => {
    let notFinishedMatch = match[4] !== status[4];
    if(!notFinishedMatch && !summaryBoard?.includes(match)) summaryBoard.push(match);
    return notFinishedMatch;
  });

  return [board, summaryBoard.sort(summaryComparator)];
}

// Function that return sended match updated by time, score and status
function updateMatch(match, time, score, statusIndex) {
  let resultMatch = [...match];
  resultMatch[0] = time;
  resultMatch[3] = score;
  resultMatch[4] = status[statusIndex];
  return resultMatch;
}

// Comparator to order matches by total score
function summaryComparator(a,b) {
  return totalScore(b[3]) - totalScore(a[3]);
}

// returns the total score from string value adding both numers separated by "-"
function totalScore(score) {
  return score.split('-').reduce((accumulator, currentValue) =>
    parseInt(accumulator) + parseInt(currentValue)
  )
}
