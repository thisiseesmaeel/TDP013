import React, { Component } from 'react'

export class Friend extends Component {
    render() {
        return (
            <div className = "test">
            <div>
                <h3>{this.props.firstname} {this.props.lastname} </h3>
            </div>
            <div>{this.props.username}</div>
            </div>
        )
    }
}

export default Friend
