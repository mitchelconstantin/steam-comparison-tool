import React from "react";
import ListItem from "./ListItem.jsx";

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showGamesData() {
    let renderTable = [];
    for (var key in this.props.topGames) {
      console.log(this.props.topGames[key])
      renderTable.push(
        <tr>
          <td> {this.props.topGames[key].name} </td>
          <td>{this.props.topGames[key].occurances}</td>
        </tr>
      );
    }
    return renderTable;
  }

  render() {
    return (
      <div>
        <h4>
          Games in common:
        </h4>
        <h4 />
        <table>
          <tr>
            <td> Name of Game </td>
            <td> Number of Occurances </td>
          </tr>
         {this.showGamesData()}
        </table>
      </div>
    );
  }
}
export default Games;
