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
      searchValue: '76561198200329058'
    }
    this.onChange = this.onChange.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getID = this.getID.bind(this);
  }
  componentDidMount() {
    // this.setState({searchValue: '76561198200329058'})
    this.getProfile();
  }
  onChange(e){
    console.log(e.target.value);
    this.setState({
      searchValue: e.target.value
    })
  }

  getID() {
    $.ajax({
      url: '/id', 
      data: {id: this.state.searchValue},
      success: (data) => {
        this.setState({
          searchValue: JSON.parse(data)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  getProfile() {
    // console.log('typeof', typeof id);
    // console.log(id);
    $.ajax({
      url: '/profile', 
      data: {id:  this.state.searchValue},
      success: (data) => {
        this.setState({
          playerInfo: JSON.parse(data),
          searchValue: ''
        })

      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Steam Profile Viewer</h1>
      <h4> sample steam ids mitchelconstantin Doogla aerobro 76561198015992404</h4>
      <List items={this.state.items} playerInfo={this.state.playerInfo}/>
  <input type='text' value={this.state.searchValue}onChange={this.onChange}/>  
  <button onClick={this.getID}>Get ID!</button>   
  <button onClick={this.getProfile}>Get Profile!</button>  
    </div>
  )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));