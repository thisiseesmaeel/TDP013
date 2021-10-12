import React, { Component } from 'react'

export class Friend extends Component {
    constructor(props){
        super(props)

        this.showFriend = this.showFriend.bind(this)
    }

    showFriend = () => {
        this.props.showFriend(this.props.username)
    }
    render() {
        return (
            <>
            <div className="shadow-box primary-box animation text-center mt-4 p-3">
                <h5> {this.props.firstname} {this.props.lastname}  </h5>
                    <button className="btn btn-primary btn-sm w-50"
                    onClick = { this.showFriend }>Profile</button>
                    <button className="btn btn-primary btn-sm w-50" 
                    onClick = {() => this.props.changePage("chat-page", {friendUsername: this.props.username}) }>Chat</button>
            </div> 
            </>
        )
    }
}

export default Friend
