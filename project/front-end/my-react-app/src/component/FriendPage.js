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
            <PostList postList = { this.props.data.posts } />
            {/* <div className="test mt-4 p-3">
                <h2>Post1</h2>
                <p>Blablabbla Blablabbla Blablabbla Blablabbla Blablabbla Blablabbla</p>
            </div>
            
            <div className="test mt-4 p-3">
                <h2>Post2</h2>
                <p>Blablabbla Blablabbla Blablabbla Blablabbla Blablabbla Blablabbla</p>
            </div> */}

        </div>
        )
    }
}

export default FriendPage
