import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: ['Hello','World'],
      playerInfo: [['test', 123]],
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/user', 
      success: (data) => {
        var parseBody = JSON.parse(data);
        console.log('here is your JSON DATA');
        // console.log(parseBody);

        // console.log('here is parseBody.response.players[0]');
        // console.log(parseBody.response.players[0]);
        // var newState = parseBody.response.players[0];
        this.setState({
          playerInfo: JSON.parse(data)
        })
        console.log('here is your new state');
        console.log(this.state.playerInfo);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Item List</h1>
      <List items={this.state.items} playerInfo={this.state.playerInfo}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));