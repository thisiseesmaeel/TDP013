import React, { Component } from 'react'
import Post from './Post'

export class PostList extends Component {
    constructor(props){
        super(props)
        this.state = {
            postList: this.props.postList,
            message: ""
        }
        this.handleChangePostMessage = this.handleChangePostMessage.bind(this)
        this.updatePostList = this.updatePostList.bind(this)
        this.post = this.post.bind(this)
    }

    handleChangePostMessage(event) {
        this.setState({ message: event.target.value });
    }

    updatePostList = async () => {
        let updatedPostList = null
        const object = {
            myUsername: this.props.myUsername,
            loggedInID: this.props.loggedInID,
        }
        await fetch("http://localhost:3000/showposts", {
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
            console.log("Updating posts!")
            updatedPostList = data
        }).catch((err) => {
            console.log(err.message)
        })
        return updatedPostList
    }
    post = () =>
    {
        console.log("I am trying to post something ...")
        const object = {
            myUsername: this.props.myUsername,
            loggedInID: this.props.loggedInID,
            destUsername: this.props.myUsername,
            message : this.state.message
            }

        fetch("http://localhost:3000/writepost", {
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
        .then(async (data) => {
            let updatedPostList = await this.updatePostList()
            this.setState({postList: updatedPostList})
        }).catch((err) => {
            console.log(err.message)
        })
    }

    componentDidMount(){
        setInterval(async () => {
        let updatedPostList = await this.updatePostList()
        this.setState({postList: updatedPostList})
    }, 35000)
    }

    render() {
        let element = this.state.postList.map((post) => (
             <Post key = { post.time } body = { post.body } owner = { post.owner } time = { post.time }/> 
            )) 
    return (
        <div>
            <div className ="p-4 text-center">
                <input type="text" value = {this.state.message} onChange = { this.handleChangePostMessage } className="w-75" style={{height: "35px"}} id="userName" placeholder="Post something..."/>
                <button className="btn btn-primary" onClick = { this.post }>Post</button>
            </div>
            <div id = "insertion_point">
                { element } 
            </div>
          
        </div>
        )
    }
}

export default PostList
