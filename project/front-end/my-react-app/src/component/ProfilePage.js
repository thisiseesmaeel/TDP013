import React, { Component } from 'react'
import FriendList from './FriendList'
import PostList from './PostList'
import FriendRequestList from './FriendRequestList'

export class ProfilePage extends Component {
    constructor(props){
        super(props)
        this.showFriend = this.showFriend.bind(this)
    }

    showFriend = (params) => {
        const object = {
            myUsername: this.props.data.username,
            loggedInID: this.props.data.loggedInID,
            friendUsername: params
        }
        fetch("http://localhost:3000/friendprofile", {
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
            this.props.changePage("friend-page", data)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    render() {
        console.log("This data is comming from my parent component:")
        console.log(this.props.data)
        console.log("From ProfilePage")
        console.log(this.props.data.friends)

        return (
            <div>
                <div className="test p-3">
                    <div className="d-flex justify-content-between">
                        <h1 className = "text-primary">Welcome { this.props.data.firstname }</h1>
                        <button className="btn btn-danger mr-2 btn-sm"> Logout </button>
                    </div>
                </div>
                <div className="test text-center p-3">
                    <button className="w-25 btn btn-primary" onClick = {() => this.props.changePage("find-user-page", this.props.data)} >Find friend</button>
                </div>

                <div className ="test p-4 text-center">
                    <input type="text" className="w-75" style={{height: "35px"}} id="userName" placeholder="Post something..."/>
                    <button className="btn btn-primary">Post</button>
                </div>

                <div className="d-flex">
              
                    <div className="test w-25 mr-2 ml-2 p-2">
                        <h5>Friends list</h5>
                          <FriendList friendList = { this.props.data.friends } showFriend = { this.showFriend }/>
                
                    </div>
                    <div className="test w-50 mr-2 p-2" style={{ minHeight: "600px" }}>
                        <h5>Timeline </h5>
                        <PostList postList = { this.props.data.posts } /> 
                    </div>
                    
                    <div className="test w-25 mr-2 p-2">
                        <h5>Friend Requests</h5>
                        <FriendRequestList friendRequestList = { this.props.data.receivedRequests } />
                    </div>
                </div>  
            </div>
        )
    }
}

export default ProfilePage
