import React, { Component } from 'react';
import {getCookie} from './utils'; 
import arrowIcon from "./icon/arrow-thin-right.svg";
import returnIcon from './icon/chevron-left.svg'; 

import './css/style.css'; 

class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      room: props.room || "",
      messages: [],
      messageBox: "" 
    }

    this.getMessages = this.getMessages.bind(this)
    this.sendMessage = this.sendMessage.bind(this) 
    this.updateInput = this.updateInput.bind(this) 
  }

  sendMessage(event) {
    event.preventDefault(); 

    const payload = {
      datetime: Date.now(),
      room: this.props.room,
      username: getCookie("conciergeUsername"),
      message: this.state.messageBox 
    }

    this.setState({messageBox: ""});

    console.log(payload); 
  }

  getMessages(room) {
    return room === "global" ? 
     [
      {
        "user" : "sebastian",
        "room" : "global",
        "dateTime": "",
        "message" : "Welcome to the global train chat! "
      },
      {
        "user" : "rich",
        "room" : "global",
        "dateTime": "",
        "message" : "Hello there, " + getCookie("conciergeUsername") + "! " 
      } 
    ]
    : room === "conductor" ? 
    [
     {
        "user" : "Concierge",
        "room" : "conductor",
        "dateTime": "",
        "message": "Hi there! I am this train's Concierge ready to ask for your instructions. "
     },
     {
        "user" : "Concierge",
        "room" : "conductor",
        "dateTime": "",
        "message": "You can ask me about if there is a delay, what the weather is like, the latest news and so on! "
     }
    ]
    : room === "carriage" ? 
    [
      {
        "user" : "Concierge",
        "room" : "carriage",
        "dateTime": "",
        "message": "This is the carriage number X. You can speak to people from this carriage! Please mind your words, haha. "
     }
    ]
    : 
    // room === "trolleyCart"
    [
      {
        "user" : "Concierge",
        "room" : "trolleyService",
        "dateTime": "",
        "message": "This is the trolley service. What would you need from the trolley? "
      }
    ]
  }

  updateInput(event) {
    const target = event.target;
    const key = target.name
    const value = target.value

    this.setState({[key]: value});
  }

  componentDidMount(){
    this.setState({messages: this.getMessages(this.state.room)});
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.room !== prevProps.room) {
      this.setState({
        messages: this.getMessages(this.props.room)
      })
    }
  }

  render(){
    const { messages, room } = this.state;
    return (
      <div>
        <button className="returnButton" onClick={() => {window.location.reload();}}> <img src={returnIcon} /> <br /> </button> 
        <div className="displayAllMessages">
          <h3 className="roomTitle">{ room } room </h3>
          { messages.map((it, index) => (
            <div key={index}>
              <span className="displayName">    { it.user }</span>: 
              <span className="displayMessage"> { it.message }</span>
            </div>
          ))
          }
          <form className="formClass" name="object" onSubmit={this.sendMessage}>
            <input type="text" name="messageBox" value={this.state.messageBox} onChange={this.updateInput}/>
            <button className="sendButton" type="submit"> <img src={arrowIcon} /> </button> 
          </form>
        </div>
      </div> 
    )
  }
}
export default Messages;