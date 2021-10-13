import React, { Component } from 'react'
import Chat from './Chat'

export class ChatLog extends Component {
    
    render() {
        return this.props.chatLog.map((chat, index) => (
            <Chat key = {index} owner = { chat.owner } chat = { chat.message }/>
        ))
    }
}

export default ChatLog
