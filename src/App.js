import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      loading: false,
      username: "",
      name: "",
      seatNumber: ""
    }
  }

  setCookie(data) {
    console.log("Setting cookie and loading chat...")
    console.log(data)

  }

  render() {
    const { username, name, seatNumber } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            Greetings from the concierge
          </p>
        </header>
          { username ?
            <div>

            </div>
          :
            <div>
              <p>Enter your name and seat number to begin:</p>

              <form onSubmit={() => this.setCookie(this)}>
                <p>
                  <label>Name: </label>
                  <input id="name" type="text" value={name} />
                </p>
                <p><label>Seat Number: </label>
                  <input id="seatNumber" type="text" value={seatNumber} />
                </p>
                <input type="submit" />
              </form>
            </div>
          }
        </div>
    );
  }
}

export default App;
