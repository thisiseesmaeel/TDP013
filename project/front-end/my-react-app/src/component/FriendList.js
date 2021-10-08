import React, { Component } from 'react'
import Friend from './Friend'

export class FriendList extends Component {
    state = {
        friendList: [
            {
                firstname: "Hadi",
                lastname: "Ansari",
                username: "hadi222"
            },
            {
                firstname: "Ismail",
                lastname: "Safwat",
                username: "ismail222"
            }
        ]
    }
    render() {
        return this.state.friendList.map((friend) => (
            <Friend key = { friend.username } firstname = {friend.firstname} lastname = {friend.lastname} username= { friend.username } /> 
        ))
    }
}

export default FriendList
