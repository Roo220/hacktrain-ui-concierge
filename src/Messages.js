import React, { Component } from 'react';

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
    console.log(this.state.messageBox); 
    console.log(this.props.room+"asfasfsaf"); 
    event.preventDefault(); 
  }

  getMessages(room) {
    return room === "global" ? 
     [
      {
        "user" : "sebastian",
        "room" : "global",
        "dateTime": "",
        "message" : "Hello"
      },
      {
        "user" : "rich",
        "room" : "global",
        "dateTime": "",
        "message" : "Hello to you too"
      } 
    ]
    : 
    []
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
        <h4>{ room }</h4>
        { messages.map(it => (
          <div>
            <span>{ it.user } - </span>
            <span>{ it.message }</span>
          </div>
        ))
        }
        <form name="object" onSubmit={this.sendMessage}>
          <input type="text" name="messageBox" value={this.state.messageBox} onChange={this.updateInput}/>
          <input type="submit" value="Send!" /> 
        </form>
      </div>
    )
  }
}
export default Messages;