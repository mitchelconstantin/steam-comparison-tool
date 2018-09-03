import React from "react";
import ListItem from "./ListItem.jsx";

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showGamesData() {
    let renderTable = [];
    // console.log('game length')
    // console.log(this.props.topGames.length);
    if (this.props.topGames.length < 2) {
      renderTable.push(
      <tr>
      <td> No games in common </td>
      <td> none </td>
    </tr>)
    } else {
      for (var key in this.props.topGames) {
        renderTable.push(
          <tr>
            <td> {this.props.topGames[key].name} </td>
            <td>{this.props.topGames[key].occurances}</td>
          </tr>
        );
      }
    }
    return renderTable;
  }

  render() {
    return (
      <div className="col-sm">
        
        
        <table className="table table-striped table-dark table-hover">
        <thead>
        <h4>
          Games in common:
        </h4>
   
          </thead>
          <tbody>
          <tr>
            <th> Name of Game </th>
            <th> Number of Occurances </th>
          </tr>
         {this.showGamesData()}
         </tbody>
        </table>
      </div>
    );
  }
}
export default Games;
