import React, { Component } from 'react';
import { getCookie } from './utils';
import Messages from './Messages'
// import logo from './logo.svg';
import './App.css';
import './css/style.css';

// Import icons
import globalIcon from './icon/web.svg'; 
import conductorIcon from './icon/user.svg'; 
import carriageIcon from './icon/user-group.svg'; 
import cartIcon from './icon/cart.svg'; 
import feedbackIcon from './icon/lightbulb.svg'; 
import helpIcon from './icon/question.svg'; 

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
      room: ""
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
            { this.state.room === "help" ?
              <div>
                <h1> How to use this app? </h1> 
                <p> Click on one of the given rooms to access them: </p>
                <ul>
                  <li> <b> Global Room </b> is used for every person in this train. </li>
                  <li> <b> Carriage Room </b> is used for every person in the carriage you are in. </li>
                  <li> <b> Concierge Room </b> is used for any person that wishes to use the chatbot. </li>
                  <li> <b> Trolley Service Room </b> is used for anyone that wants to order food. </li>
                </ul>
                <p> Click on the back icon to come back to the main selection menu. </p> 
                <p> More help to be added soon! </p> 
                <input type="submit" value="Return to room selection menu!" onClick={() => {window.location.reload();}}/>
              </div>
              : this.state.room === "feedback" ?
              <div>
                <h1> We want your feedback over our app! </h1> 
                <p> Do you think there are any good ways we can improve the app? Or are there any faults or problems that you have found? </p>
                <form> 
                  <textarea placeholder="Write to us here.." rows="8" cols="100"/> <br />
                  <input type="submit" value="Send!" onClick={() => {window.location.reload();}}/>
                </form> 
              </div>
              : this.state.room != "" ?
              <div>
                <Messages room={room} />
              </div>      
              :
              <div className="menu">
                <center>
                <h2> Select a room.. </h2>
                  <table>
                   <tr>
                     <td>
                     
                     </td>
                     <td>
                      <button className="mainButton" onClick={() => {this.setRoom("global")}}> <img src={globalIcon} /> <br /> Global </button>
                     </td>
                     <td>
                      <button className="mainButton" onClick={() => {this.setRoom("conductor")}} > <img src={conductorIcon} /> <br /> Conductor </button>
                     </td>
                     <td><p align="left">
                      <button className="smallButton" onClick={() => {this.setRoom("help")}} > <img src={helpIcon} /> <br /> Help </button>
                     </p></td>
                    </tr>
                    <tr>
                      <td valign="bottom"><p align="right">
                        <button className="smallButton2" onClick={() => {this.setRoom("feedback")}} > <img src={feedbackIcon} /> <br /> Feedback </button>
                      </p></td>
                      <td>
                        <button className="mainButton" onClick={() => {this.setRoom("carriage")}}> <img src={carriageIcon} /> <br /> Carriage </button>
                      </td>
                      <td>
                        <button className="mainButton" onClick={() => {this.setRoom("trolleyService")}}> <img src={cartIcon} /> <br /> TrolleyService </button>
                      </td>
                      <td>
                      
                      </td>
                    </tr>
                  </table> 
                </center>
              </div>
            }
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
