import React from "react";
class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showGamesData() {
    let renderTable = [];

    if (this.props.topGames.length < 2) {
      renderTable.push(
      <tr key={'3'}>
      <td> No games in common </td>
      <td> none </td>
    </tr>)
    } else {
      for (var key in this.props.topGames) {
        renderTable.push(<tr key={this.props.topGames[key].name}>
            <td> {this.props.topGames[key].name} </td>
            <td>{this.props.topGames[key].occurances}</td>
          </tr>);
      }
    }
    return renderTable;
  }

  render() {
    return (
      <div className="col-sm">
        
        <table className="table table-striped table-dark table-hover">
        <thead>
          <tr key={'0'}>
            <td>
                <h4>
                  Games in common:
        </h4>
            </td>
          </tr>

   
          </thead>
          <tbody>
          <tr key={'1'}>
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
