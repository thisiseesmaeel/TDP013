import React, { Component } from 'react'
import FriendRequest from './FriendRequest'

export class FriendRequestList extends Component {
    constructor(props){
        super(props)
        this.state = {
            friendRequestList: this.props.friendRequestList
        }
    }
    componentDidMount(){
        setInterval(() => {
            const object = {
                myUsername: this.props.myUsername,
                loggedInID: this.props.loggedInID
            }
            fetch("http://localhost:3000/friendrequests", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(object)
            }).then((res) => 
            {   
                if(!res.ok) {throw new Error(res.status)}
                return res.json()
            })
            .then((updatedFriendRequests) => {
                console.log("Updating friend request list!")
                this.setState({friendRequestList: updatedFriendRequests})
            }).catch((err) => {
                console.log(err.message)
            })
    }, 35000)
    }
    render() {
    return this.state.friendRequestList.map((friendRequest) => (
            <FriendRequest key = { friendRequest.username } firstname = { friendRequest.firstname } 
            lastname = { friendRequest.lastname } username = { friendRequest.username } />
    ))
    }
}

export default FriendRequestList
