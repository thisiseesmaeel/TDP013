import React, { Component } from 'react'
import Friend from './Friend'

export class FriendList extends Component {
    render() {
        return this.props.friendList.map((friend) => (
            <Friend key = { friend.username } firstname = {friend.firstname} 
            lastname = {friend.lastname} username = { friend.username }
            showFriend = { this.props.showFriend }
            /> 
        ))
    }
}

export default FriendList
