import React, { Component } from 'react'
import FriendRequest from './FriendRequest'

export class FriendRequestList extends Component {
    constructor(props){
        super(props)
        this.state = {
            friendRequestList: this.props.friendRequestList,
            myInterval: null
        }
        this.updateFriendRequestList= this.updateFriendRequestList.bind(this)
        this.acceptRequest = this.acceptRequest.bind(this)
    }
    updateFriendRequestList = async () => {
        console.log("Checking if there is newer friend request list...")
        let updatedFriendRequests = null
        const object = {
            myUsername: this.props.myUsername,
            loggedInID: this.props.loggedInID
        }
        await fetch("http://localhost:3000/friendrequests", {
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
        .then((data) => {
            updatedFriendRequests = data
        }).catch((err) => {
            console.log(err.message)
        })
        return updatedFriendRequests
    }

    acceptRequest = async (friendFirstname, friendLastname, friendUsername) => {
        console.log(`Accepting friend request from ${friendFirstname} ${friendLastname} with username of ${friendUsername}`)
        const object = {
            myUsername: this.props.myUsername,
            loggedInID: this.props.loggedInID,
            otherFirstname: friendFirstname,
            otherLastname: friendLastname,
            otherUsername: friendUsername
        }
        await fetch("http://localhost:3000/acceptrequest", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(object)
        }).then((res) => 
        {   
            if(!res.ok) {throw new Error(res.status)}
        }).catch((err) => {
            console.log(err.message)
        })

        let updatedFriendRequests = await this.updateFriendRequestList()
        this.setState({friendRequestList: updatedFriendRequests})     
    }

    componentDidMount(){
        this.myInterval = setInterval(async () => {
            let updatedFriendRequests = await this.updateFriendRequestList()
            if( JSON.stringify(updatedFriendRequests) !== JSON.stringify(this.state.friendRequestList) ) {
                    console.log("New friend request list detected. Updating friend request list...")
                    this.setState({friendRequestList: updatedFriendRequests})
                }
            else{ console.log("There is no new friend request.") }
        }, 35000)
    }

    componentWillUnmount()
    {
        clearInterval(this.myInterval);
    }
    render() {
        return this.state.friendRequestList.map((friendRequest) => {
            return <FriendRequest key = { friendRequest.username } firstname = { friendRequest.firstname } 
            lastname = { friendRequest.lastname } username = { friendRequest.username } acceptRequest = { this.acceptRequest } />
        })
    }
}

export default FriendRequestList
