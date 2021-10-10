import React, { Component } from 'react'
import PostList from './PostList'

export class FriendPage extends Component {
    render() {
        console.log(this.props.data.posts)
        return (
        <div>
            <div className = "test p-3 topheader">
                <h1>{ this.props.data.firstname } { this.props.data.lastname }'s page</h1>
            </div>
            {/* <div className ="test p-4 text-center">
                <input type="text" className="w-75" style={{height: "35px"}} id="userName" placeholder=""/>
                <button className="btn btn-primary">Write post</button>
            </div> */}
            <div className = "row" >
                
                <div className = "col-md-8 mx-auto" >
                    <PostList postList = { this.props.data.posts } myUsername = { this.props.myUsername }
                          loggedInID = { this.props.loggedInID } destUsername = { this.props.data.username }/>
                </div>
            </div>
            
        </div>
        )
    }
}

export default FriendPage
