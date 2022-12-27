import React from "react";
import { Row } from "./Row";

export class Board extends React.Component {
  render() {
    const rowResult = this.props.boardData.map((data, i) => 
      <Row key={i} labelList={data} isHeader={i === 0} />
    );
    
    return (
      <table className="dynamic-board">
        <tbody>
          {rowResult}
        </tbody>
      </table>
    );
  }
}
