import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import List from "./components/List.jsx";
import Games from "./components/Games.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      playerInfo: [["test", 123]],
      searchValue: "76561198200329058",
      topGames: [{}]
    };
    this.onChange = this.onChange.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getID = this.getID.bind(this);
  }
  componentDidMount() {
    this.getProfile();
  }
  onChange(e) {
    console.log(e.target.value);
    this.setState({
      searchValue: e.target.value
    });
  }

  getID() {
    $.ajax({
      url: "/id",
      data: { id: this.state.searchValue },
      success: data => {
        this.setState({
          searchValue: JSON.parse(data)
        });
      },
      error: err => {
        console.log("err", err);
      }
    });
  }
  // this.state.searchValue
  postTopGames() {
    console.log("----------------------------");
    console.log(" POST to /games");
    console.log("trying to attach, ", this.state.searchValue);
    console.log("----------------------------");

    $.ajax({
      type: "POST",
      url: "/games",
      contentType: "application/json",
      data: JSON.stringify({ id: this.state.searchValue }),
      success: data => {
        console.log("wow this worked");
        this.getTopGames();
        var parsedData = JSON.parse(data);
        this.setState({
          searchValue: ""
        });

        if (parsedData.length > 0) {
          this.setState({
            topGames: parsedData
          });
        }
      },
      done: (x) => {console.log("we done")},
      error: err => {
        console.log("wow this failed");
        console.log("err", err);
      }
    });
  }

  getTopGames() {
    console.log("post top games was called");
    $.ajax({
      url: "/games",
      data: { id: this.state.searchValue },
      success: data => {
        this.setState({
          searchValue: ""
        });
        var parsedData = JSON.parse(data);

        if (parsedData.length > 0) {
          this.setState({
            topGames: parsedData,
            searchValue: ""
          });
        }
      },
      error: err => {
        console.log("err", err);
      }
    });
  }

  getProfile() {
    // console.log('typeof', typeof id);
    // console.log(id);
    var nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (var i = 0; i < this.state.searchValue.length; i++) {
      if (!nums.includes(this.state.searchValue[i])) var containsText = true;
      break;
    }
    if (!containsText) {
      this.setState({
        status: ""
      });

      $.ajax({
        url: "/profile",
        data: { id: this.state.searchValue || 76561198200329058 },
        success: data => {
          console.log("calling post top games");
          this.postTopGames();
          this.setState({
            playerInfo: JSON.parse(data)
          });
        },
        error: err => {
          console.log("err", err);
        }
      });
    } else {
      this.setState({
        status:
          "That input contains a letter. Consider clicking the Get ID button first!"
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Steam Profile Viewer</h1>
        <h4>
          {" "}
          sample steam ids mitchelconstantin Doogla aerobro 76561198015992404
          76561198040706268 76561198012307420
        </h4>
        <List items={this.state.items} playerInfo={this.state.playerInfo} />
        <h4> status: {this.state.status} </h4>
        <input
          type="text"
          value={this.state.searchValue}
          onChange={this.onChange}
        />
        <button onClick={this.getID}>Get ID!</button>
        <button onClick={this.getProfile}>Get Profile!</button>
        <Games topGames={this.state.topGames} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
