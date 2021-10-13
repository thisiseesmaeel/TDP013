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
            socket: null,
            errorMessage: null
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
            this.setState({chatLog: [...this.state.chatLog, {"owner": this.props.data.friendFirstname, message: msg}]})
        })
    }
    handleChat = (event) => {
        this.setState({ message: event.target.value});
    }
    
    sendMessage = (e) => {
        e.preventDefault()
        console.log(this.state.message)
        if(this.state.message.length <= 0 || this.state.message.length > 140)
        {
            this.setState({errorMessage: "Empty message or messages with more than 140 characters are not allowed!", message: ""})
        }
        else{
            this.state.socket.emit("chat message", this.state.message, this.state.room)
            this.setState({sentMessage: this.state.message, chatLog: [...this.state.chatLog, {"owner": "Me", message: this.state.message}], message: "", errorMessage: null})
        }
    }
    render() {
        return (
        <>
        <div className="primary-box p-3 topheader">
            <div className="d-flex justify-content-between ">
                <h4>You are chatting with { this.props.data.friendFirstname } { this.props.data.friendLastname }</h4>
                <div className = "d-flex justify-content-around" style ={{ width: "200px"}}>
                    <button className="btn btn-primary btn-sm" style = {{ borderColor: "white" }} onClick = { this.showProfile }> My profile </button>
                    <button className="btn btn-danger btn-sm" onClick = { this.logout }> Logout </button>
                </div>
            </div>
        </div>
        <div className = "chat-body">
        <div className = "text-center mx-auto w-50" style = {{color: "red"}}> { this.state.errorMessage } </div>
          <ul id="messages"><ChatLog chatLog = {this.state.chatLog}/></ul>
          <form id="form" action="">       
          <input id="input" value= { this.state.message } onChange = { this.handleChat } autoComplete="off" /><button onClick = { this.sendMessage }>Send</button>
          </form>
        </div>
        </>
        )
    }
}

export default ChatPage
