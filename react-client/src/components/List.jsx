import React from "react";
import ListItem from "./ListItem.jsx";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div>
        <h4> Here is the test info for the player you requested: </h4>
        <h4 />

        <table>
          <tr>
            <td> player one </td>
            <td>
              {" "}
              <img
                src={this.props.playerInfo.avatar}
                height="100"
                width="100"
              />
            </td>
          </tr>
          <tr>
            <td> Steam ID: </td>
            <td> {this.props.playerInfo.steamid} </td>
          </tr>
          <tr>
            <td> Person Name: </td>
            <td> {this.props.playerInfo.personaname} </td>
          </tr>

          <tr>
            <td> Time Created: </td>
            <td> {this.props.playerInfo.timecreated} </td>
          </tr>

          <tr>
            <td> Last Logoff: </td>
            <td> {this.props.playerInfo.lastlogoff} </td>
          </tr>
        </table>
      </div>
    );
  }
}
export default List;
