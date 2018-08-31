import React from "react";
import ListItem from "./ListItem.jsx";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showPlayerData(object) {
    console.log(object);
    let renderTable = [];
    for (var key in object) {
      if (key !== 'avatar') {
        renderTable.push(<tr>{key} {object[key]}</tr>);
      }
      
    }
    return renderTable;
  }

  render() {
    return (
      <div>
        <h4> List Component </h4>
        There are {this.props.items.length} items.
        {this.props.items.map(item => (
          <ListItem item={item}  />
        ))}
        Here is the test info for the player you requested:
        <h4 />
       <tr> <img src={this.props.playerInfo.avatar}></img> </tr>
        {this.showPlayerData(this.props.playerInfo)}
      </div>
    );
  }
}

export default List;
