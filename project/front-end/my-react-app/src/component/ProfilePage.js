import React, { Component } from 'react'
import FriendList from './FriendList'
import PostList from './PostList'
import FriendRequestList from './FriendRequestList'

export class ProfilePage extends Component {
    render() {
        console.log("This data is comming from my parent component:")
        console.log(this.props.data)

        return (
            <div>
                <div className="test p-3">
                    <h1 className = "text-primary">Welcome { this.props.data.firstname }</h1>
                </div>
                <div className="test text-center p-3">
                    <button className="w-25 btn btn-primary" onClick = {() => this.props.changePage("find-user-page")} >Find friend</button>
                </div>

                <div className ="test p-4 text-center">
                    <input type="text" className="w-75" style={{height: "35px"}} id="userName" placeholder="Post something..."/>
                    <button className="btn btn-primary">Post</button>
                </div>

                <div className="d-flex">
              
                    <div className="test w-25 mr-2 ml-2 p-2">
                        <h5>Friends list</h5>
                          <FriendList friendList = { this.props.data.friends } />
                
                    </div>
                    <div className="test w-50 mr-2 p-2" style={{ minHeight: "600px" }}>
                        <h5>Timeline </h5>
                        <PostList postList = { this.props.data.posts } /> 
                    </div>
                    
                    <div className="test w-25 mr-2 p-2">
                        <h5>Friend Requests</h5>
                        <FriendRequestList friendRequestList = { this.props.data.receivedRequests } />
                        {/* <div className="test mt-4 p-3">
                        <h6>User1</h6>
                        <div className="d-flex">
                            <button className="w-50 btn btn-success mr-2 btn-sm">Accept</button>
                            <button className="w-50 btn btn-danger mr-2 btn-sm">Ignore</button>
                        </div>
                            
                        </div> */}
                    </div>
                </div>  
            </div>
        )
    }
}

export default ProfilePage
