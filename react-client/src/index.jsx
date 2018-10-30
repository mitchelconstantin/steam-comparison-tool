import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import List from "./components/List.jsx";
import Games from "./components/Games.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '---------nothing to report -----------',
      playerInfo: [['test', 123]],
      searchValue: '76561198200329058',
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
    console.log('setting the new search value: ', e.target.value);
    this.setState({
      searchValue: e.target.value
    });
  }

  async getID() {
    const options = {
      url: '/id',
      params: { id: this.state.searchValue }
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

  async postTopGames() {
    const options = {
      url: '/games',
      method: 'POST',
      params: { id: this.state.searchValue },
      contentType: 'application/json'
    };

    try {
      const { data } = await axios(options);
      this.getTopGames();
      this.setState({
        searchValue: ''
      });
      
      if (data.length > 0) {
        this.setState({
          topGames: data
        });
      }

    } catch (err) {
      console.log(err);
    }
  }

  async getTopGames() {
    const options = {
      url: '/games',
      params: { id: this.state.searchValue }
    };

    try {
      const { data } = await axios(options);
      this.setState({
        searchValue: ''
      });

      if (data.length > 0) {
        this.setState({
          topGames: data,
          searchValue: ''
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async resetDB() {
    const options = {
      url: '/database',
      method: 'POST'
    };

    try {
      const { data } = await axios(options);
      console.log('database has been reset', data);
    } catch (err) {
      console.log(err);
    }
  }

  async printTables() {
    const options = {
      url: '/databasePrint',
      method: 'POST'
    };

    try {
      const { data } = await axios(options);
      console.log('database has been reset', data);
    } catch (err) {
      console.log(err);
    }
  }


  async getProfile() {
    var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var containsText = false;
    var searchTerm = this.state.searchValue;
    for (var i = 0; i < searchTerm.length; i++) {
      if (!nums.includes(searchTerm[i])) {
        if (searchTerm[i] === ' ') {
          console.log('it is a space');
          // searchTerm.splice(i, 1);
          var newStr = searchTerm.split(''); // or newStr = [...str];
          newStr.splice(i, 1);
          searchTerm = newStr.join('');
        } else {
          containsText = true;
        }
      }
    }
    if (containsText) {
      this.setState({
        status: 'Incorrect format, ID must be only numbers',
        searchValue: '12'
      });
      console.log('here is the status:');
    } else {
      this.setState({
        status: '---------nothing to report -----------'
      });
    }

    const options = {
      url: '/profile',
      params: { id: this.state.searchValue }
    };

    try {
      const { data } = await axios(options);
      if (data.steamid != 'Error!') {
        this.postTopGames();

      } else {
        this.setState({
          searchValue: ''
        });
      }
      this.setState({
        playerInfo: data
      });

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return <div className="file2" className="container bg-dark">
        <div className="navbar navbar-dark bg-dark ">
          <h3 className="display-4 text-white ">Steam Comparator</h3>
          <div>
            <input type="text" value={this.state.searchValue} onChange={this.onChange} />

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
        <div>
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
      </div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
