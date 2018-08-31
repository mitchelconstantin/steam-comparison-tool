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
      searchValue: ''
    }
    this.onChange = this.onChange.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getID = this.getID.bind(this);
  }
  onChange(e){
    console.log(e);
    this.setState({
      searchValue: e.target.value
    })
  }

  getID() {
    $.ajax({
      url: '/user', 
      success: (data) => {
        this.setState({
          playerInfo: JSON.parse(data)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  getProfile() {
    $.ajax({
      url: '/profile', 
      data: {id: this.state.searchValue},
      success: (data) => {
        this.setState({
          playerInfo: JSON.parse(data)
        })
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
  <input type='text' value={this.state.searchValue}onChange={this.onChange}/>  
  <button onClick={this.getID}>Get ID!</button>   
  <button onClick={this.getProfile}>Get Profile!</button>  
    </div>
  )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));