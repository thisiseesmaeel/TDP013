import React, { Component } from 'react'
import io from 'socket.io-client'
import ChatLog from './ChatLog'

//const socket = io.connect("http://localhost:3000/")

export class ChatPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            message: "",
            sentMessage: "",
            chatLog: [],
            room: "",
            socket: null
        }
        if( this.props.data.friendUsername > this.props.myUsername )
        {
            this.state.room = this.props.data.friendUsername + this.props.myUsername
        }
        else {
            this.state.room = this.props.myUsername + this.props.data.friendUsername 
        }
        this.state.socket = io.connect("http://localhost:3000/")
        this.state.socket.emit("join-room", this.state.room)

        this.sendMessage = this.sendMessage.bind(this)
        this.handleChat = this.handleChat.bind(this)
    }

    componentDidMount(){
        this.state.socket.on("chat message", msg => {
            this.setState({chatLog: [...this.state.chatLog, msg]})
        })
    }
    handleChat = (event) => {
        this.setState({ message: event.target.value});
    }
    
    sendMessage = (e) => {
        e.preventDefault()
        this.state.socket.emit("chat message", this.state.message, this.state.room)
        this.setState({sentMessage: this.state.message, chatLog: [...this.state.chatLog, this.state.message], message: ""})
    }
    render() {
        return (
        <div className = "chat-body">
          <ul id="messages"><ChatLog chatLog = {this.state.chatLog}/></ul>
          <form id="form" action="">
          <input id="input" value= { this.state.message } onChange = { this.handleChat } autoComplete="off" /><button onClick = { this.sendMessage }>Send</button>
          </form>
        </div>
        )
    }
}

export default ChatPage
