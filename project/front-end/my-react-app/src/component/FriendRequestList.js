import React, { Component } from 'react'
import FriendRequest from './FriendRequest'

export class FriendRequestList extends Component {
    render() {
    return this.props.friendRequestList.map((friendrequest) => (
            <FriendRequest key = { friendrequest.username } firstname = { friendrequest.firstname } lastname = { friendrequest.lastname } username = { friendrequest.username } />
    ))
    }
}

export default FriendRequestList
