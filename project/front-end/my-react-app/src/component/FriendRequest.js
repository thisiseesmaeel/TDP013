import React, { Component } from 'react'

export class FriendRequest extends Component {
    render() {
        return (
            <div className="test mt-4 p-3">
                <h6>{ this.props.firstname } { this.props.lastname }</h6>
                <div className="d-flex">
                    <button className="w-50 btn btn-success mr-2 btn-sm">Accept</button>
                    <button className="w-50 btn btn-danger mr-2 btn-sm">Ignore</button>
                </div>       
            </div>
        )
    }
}

export default FriendRequest
