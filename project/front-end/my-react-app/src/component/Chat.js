import React, { Component } from 'react'

export class Chat extends Component {
    render() {
        return (
            <li>{ this.props.chat }</li>
        )
    }
}

export default Chat
