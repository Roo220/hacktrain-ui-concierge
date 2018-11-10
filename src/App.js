import React, { Component } from 'react';
import { getCookie } from './utils';
import Messages from './Messages'
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    const usernameCookie = getCookie("conciergeUsername")
    console.log("username: ", usernameCookie)
    this.state = {
      error: null,
      loading: false,
      username: usernameCookie || "",
      name: "",
      seatNumber: "",
      room: "global"
    }
    this.updateInput = this.updateInput.bind(this)
    this.setCookie = this.setCookie.bind(this)
    this.setRoom = this.setRoom.bind(this)
  }

  setCookie(event) {
    console.log("setCookie()")
    event.preventDefault()
    console.log("Setting cookie and loading chat...")
    const username = this.state.name + this.state.seatNumber
    document.cookie = "conciergeUsername=" + username
    this.setState({username: username})
  }

  updateInput(event) {
    const target = event.target;
    console.log("Target: ", target)
    const key = target.name
    const value = target.value
    console.log("Key: ", key)
    console.log("Value: ", value)
  
    this.setState({[key]: value});
  }

  setRoom(room) {
    console.log("Setting room to: ", room)
    this.setState({
      room: room
    })
  }

  render() {
    const { username, room } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Greetings from the concierge
          </p>
        </header>
          { username ?
            <div>
              <div>
                <Messages room={room} />
              </div>      

              <div>
                <button onClick={() => {this.setRoom("global")}}> Global </button>
                <button onClick={() => {this.setRoom("conductor")}} > Conductor </button>
                <button onClick={() => {this.setRoom("trolleyService")}}> Trolley Service </button>
              </div>
            </div>
          :
            <div>
              <p>Enter your name and seat number to begin:</p>

              <form onSubmit={this.setCookie}>
                <p>
                  <label>Name: </label>
                  <input id="name" type="text" name="name" value={this.state.name} onChange={this.updateInput}/>
                </p>
                <p><label>Seat Number: </label>
                  <input id="seatNumber" type="text" name="seatNumber" value={this.state.seatNumber} onChange={this.updateInput}/>
                </p>
                <input type="submit" value="Submit" />
              </form>
            </div>
          }
        </div>
    );
  }
}

export default App;
