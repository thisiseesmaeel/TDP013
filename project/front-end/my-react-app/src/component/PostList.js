import React, { Component } from 'react'
import Post from './Post'

export class PostList extends Component {
    constructor(props){
        super(props)
        this.state = {
            postList: this.props.postList
        }
    }
    componentDidMount(){
        setInterval(() => {
            const object = {
                myUsername: this.props.myUsername,
                loggedInID: this.props.loggedInID,
            }
            fetch("http://localhost:3000/showposts", {
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
            .then((updatedPostList) => {
                console.log("Updating posts!")
                this.setState({postList: updatedPostList})
            }).catch((err) => {
                console.log(err.message)
            })
    }, 35000)
    }
    render() {
    return this.state.postList.map((post) => (
         <Post key = { post.time } body = { post.body } owner = { post.owner } time = { post.time }/> 
        ))
    }
}

export default PostList
