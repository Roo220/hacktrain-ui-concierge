import React, { Component } from 'react';

class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      room: props.room || "",
      messages: []
    }

    this.getMessages = this.getMessages.bind(this)
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

  componentDidMount(){
    this.setState({messages: this.getMessages(this.state.room)});
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    console.log("prev props: ", prevProps)
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
      </div>
    )
  }
}
export default Messages;