import React, { Component } from 'react'

export class Chat extends Component {
    render() {
        return (
            <li><strong>{this.props.owner} </strong> { this.props.chat }</li>
        )
    }
}

export default Chat
