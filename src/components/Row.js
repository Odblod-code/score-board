import React from "react";

export class Row extends React.Component {
  render() {
    const labelResult = this.props.labelList.map(
      (label, i) => (this.props.isHeader) ? <th key={i}>{label}</th> : <td key={i}>{label}</td>
    );

    return (
      <tr className="row">
        {labelResult}
      </tr>
    );
  }
}
