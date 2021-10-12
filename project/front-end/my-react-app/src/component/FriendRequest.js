import React, { Component } from 'react'

export class FriendRequest extends Component {
    render() {
        return (
            <div className="shadow-box primary-box animation mt-4 p-3">
                <h5>{ this.props.firstname } { this.props.lastname }</h5>
                <div className="d-flex">
                    <button className="w-50 btn btn-success mr-2 btn-sm" 
                    onClick = {() => this.props.acceptRequest(this.props.firstname, this.props.lastname, this.props.username)}>Accept</button>
                    <button className="w-50 btn btn-danger mr-2 btn-sm" 
                    onClick = {() => this.props.ignoreRequest(this.props.firstname, this.props.lastname, this.props.username)}>Ignore</button>
                </div>       
            </div>
        )
    }
}

export default FriendRequest
