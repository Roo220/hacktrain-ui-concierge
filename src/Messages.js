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

    const payload = JSON.stringify({
      dateTime: Date.now().toString(),
      room: this.props.room,
      user: getCookie("conciergeUsername"),
      message: this.state.messageBox 
    })
    console.log("Payload: ", payload)

    const settings = {
      method: "post",
      body: payload,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    console.log(settings)
    fetch("http://localhost:5000/sendMessage", settings)
    .then(res => res.json())
    .then((result) => {
        console.log(result)
        const messages = []
        result.map(it => messages.push(it))
        this.setState({messages: messages})
        this.setState({messageBox: ""})
      })
  }

  getMessages(room) {
    console.log("Retrieving messages")
    fetch("http://localhost:5000/getMessages")
    .then(res => res.json())
    .then(result => {
      console.log(result.filter(it => (it.room === room)))
      return result.filter(it => (it.room === room))
    });

    return [
      {
        user: "seb",
        datetime: "",
        message: "yes good",
        "room": "global"
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
            <input class="inputText" type="text" name="messageBox" value={this.state.messageBox} onChange={this.updateInput}/>
            <button className="sendButton" type="submit"> <img src={arrowIcon} /> </button> 
          </form>
        </div>
      </div> 
    )
  }
}
export default Messages;