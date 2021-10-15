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
        this.ignoreRequest = this.ignoreRequest.bind(this)
    }

    updateFriendRequestList = async () => {
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

    ignoreRequest = async (friendFirstname, friendLastname, friendUsername) => {
        const object = {
            myUsername: this.props.myUsername,
            loggedInID: this.props.loggedInID,
            otherFirstname: friendFirstname,
            otherLastname: friendLastname,
            otherUsername: friendUsername
        }
        await fetch("http://localhost:3000/ignorerequest", {
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
                    this.setState({friendRequestList: updatedFriendRequests})
            }
        }, 10000)
    }

    componentWillUnmount()
    {
        clearInterval(this.myInterval);
    }
    render() {
        return this.state.friendRequestList.map((friendRequest) => {
            return <FriendRequest key = { friendRequest.username } firstname = { friendRequest.firstname } 
            lastname = { friendRequest.lastname } username = { friendRequest.username }
            acceptRequest = { this.acceptRequest } ignoreRequest = { this.ignoreRequest } />
        })
    }
}

export default FriendRequestList
