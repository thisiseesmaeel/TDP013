import React, { Component } from 'react'
import Friend from './Friend'

export class FriendList extends Component {
    constructor(props){
        super(props)
        this.state = {
            friends: this.props.friends,
            myInterval: null
        }
    }
    componentDidMount(){
        this.myInterval = setInterval(()=> {
            const object = {
                myUsername: this.props.myUsername,
                loggedInID: this.props.loggedInID
            }
            fetch("http://localhost:3000/showfriends", {
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
            .then((updatedFriends) => {
                if(JSON.stringify(updatedFriends) !== JSON.stringify(this.state.friends)){
                    this.setState({friends: updatedFriends})
                }
            }).catch((err) => {
                console.log(err.message)
            })
        }, 10000)        
    }

    componentWillUnmount()
    {
        clearInterval(this.myInterval)
    }

    render() {
        return this.state.friends.map((friend) => (
            <Friend key = { friend.username } firstname = {friend.firstname} 
            lastname = {friend.lastname} username = { friend.username }
            showFriend = { this.props.showFriend }
            changePage = {this.props.changePage} /> 
            ))
    }
}

export default FriendList
