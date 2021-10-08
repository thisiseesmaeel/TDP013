import React, { Component } from 'react'
import PostList from './PostList'

export class FriendPage extends Component {
    render() {
        return (
        <div>
            <h1 className="text-center fw-bold text-primary">{ this.props.data.firstname } { this.props.data.lastname }</h1>
            <div className ="test p-4 text-center">
                <input type="text" className="w-75" style={{height: "35px"}} id="userName" placeholder=""/>
                <button className="btn btn-primary">Write post</button>
            </div>
            <div className = "row" >
                <div className = "col-md-8 mx-auto" >
                    <PostList postList = { this.props.data.posts } />
                </div>
            </div>
            
        </div>
        )
    }
}

export default FriendPage
