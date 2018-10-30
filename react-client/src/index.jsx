import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from 'axios';
import List from "./components/List.jsx";
import Games from "./components/Games.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "---------nothing to report -----------",
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
    console.log("setting the new search value: ", e.target.value);
    this.setState({
      searchValue: e.target.value
    });
  }

  //axios
  async getID() {
    const options = {
      url: "/id",
      params: {id: this.state.searchValue}
    };

    try {
      const { data } = await axios(options);
      console.log(data);
      this.setState({
        searchValue: data
      });
    } catch (err) {
      console.log(err);
    }
  }

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
      done: x => {
        console.log("we done");
      },
      error: err => {
        console.log("wow this failed");
        console.log("err", err);
      }
    });
  }

  getTopGames() {
    console.log("-----------------");
    console.log("GETTING TOP GAMES");
    console.log("-----------------");
    $.ajax({
      url: "/games",
      data: { id: this.state.searchValue },
      success: data => {
        console.log("got data back from top games: ", data);
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
  resetDB() {
    console.log(" resetting the DB!");
    $.ajax({
      type: "POST",
      url: "/database",
      success: data => {
        console.log("database has been reset", data);
      },
      error: err => {
        console.log("resetting DB failed");
        console.log("err", err);
      }
    });
  }

  printTables() {
    console.log(" printing the tables!");
    $.ajax({
      type: "POST",
      url: "/databasePrint",
      success: data => {
        console.log("database has been reset", data);
      },
      error: err => {
        console.log("resetting DB failed");
        console.log("err", err);
      }
    });
  }

  getProfile() {
    var nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var containsText = false;
    console.log(
      "looping through searchvalue to look for letters, ",
      this.state.searchValue
    );
    var searchTerm = this.state.searchValue;
    for (var i = 0; i < searchTerm.length; i++) {
      if (!nums.includes(searchTerm[i])) {
        if (searchTerm[i] === " ") {
          console.log("it is a space");
          // searchTerm.splice(i, 1);
          var newStr = searchTerm.split(""); // or newStr = [...str];
          newStr.splice(i, 1);
          searchTerm = newStr.join("");
        } else {
          containsText = true;
        }
      }

      console.log("that is not a profile");
    }
    if (containsText) {
      this.setState({
        status: "Incorrect format, ID must be only numbers",
        searchValue: "12"
      });
      console.log("here is the status:");
    } else {
      this.setState({
        status: "---------nothing to report -----------"
      });
    }
    console.log("!containsText is true");

    $.ajax({
      url: "/profile",
      data: { id: this.state.searchValue },
      success: data => {
        console.log(" here is the steamid , ", JSON.parse(data).steamid);
        if (JSON.parse(data).steamid != "Error!") {
          console.log("calling post top games if not err");
          this.postTopGames();
        } else {
          this.setState({
            searchValue: ""
          });
        }
        this.setState({
          playerInfo: JSON.parse(data)
        });
      },
      error: err => {
        console.log("err", err);
      }
    });
  }

  render() {
    return ( 
      <div class="file2" className="container bg-dark">
        <div className="navbar navbar-dark bg-dark ">
          <h3 className="display-4 text-white ">Steam Comparator</h3>
          <div>
            <input
              type="text"
              value={this.state.searchValue}
              onChange={this.onChange}
            />
            {/* <form className="form-inline my-2 my-lg-0" /> */}

            <button className="btn btn-primary" onClick={this.getID}>
              Get ID!
            </button>
            <button className="btn btn-secondary" onClick={this.getProfile}>
              Get Profile!
            </button>
          </div>
        </div>
        <div className="navbar navbar-dark bg-dark ">
          <h6 className="text-white"> status: {this.state.status} </h6>
        </div>
        <div className="row ">
          <List items={this.state.items} playerInfo={this.state.playerInfo} />

          <Games topGames={this.state.topGames} />
        </div>
        <h5>DEV TOOLS: </h5>
        <h4>DEMO steam name: mitchelconstantin</h4>
        <h4>
          DEMO steam ids: [76561198062240812, 76561197991457319,
          76561198015992404]
        </h4>
        <button className="btn btn-secondary" onClick={this.resetDB}>
          Reset DB!
        </button>
        <button className="btn btn-secondary" onClick={this.printTables}>
          see all DB!
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
