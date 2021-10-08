import React, { Component } from 'react'
import Post from './Post'

export class PostList extends Component {
    render() {
    return this.props.postList.map((post) => (
         <Post key = { post.time } body = { post.body } owner = { post.owner } time = { post.time }/> 
        ))
    }
}

export default PostList
