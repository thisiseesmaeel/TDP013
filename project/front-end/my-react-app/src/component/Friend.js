import React, { Component } from 'react'

export class Friend extends Component {
    render() {
        return (
            <>
            <div className="test text-center p-1 mb-3">
            <h6> {this.props.firstname} {this.props.lastname}  </h6>
            <button className="w-50 btn btn-primary mr-2 btn-sm">Show profile</button>
            </div> 
            </>
        )
    }
}

export default Friend
