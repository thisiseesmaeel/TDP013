import React, { Component } from 'react'
import Post from './Post'

export class PostList extends Component {
    constructor(props){
        super(props)
        this.state = {
            postList: this.props.postList,
            message: "",
            myInterval: null
        }
        console.log("From postlist!")
        console.log(this.state.postList)
        this.handleChangePostMessage = this.handleChangePostMessage.bind(this)
        this.updatePostList = this.updatePostList.bind(this)
        this.post = this.post.bind(this)
    }

    handleChangePostMessage(event) {
        this.setState({ message: event.target.value });
    }

    updatePostList = async () => {
        console.log("Checking if there is a newer postlist...")
        let updatedPostList = null
        const object = {
            myUsername: this.props.myUsername,
            loggedInID: this.props.loggedInID,
            destUsername: this.props.destUsername
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
            updatedPostList = data
        }).catch((err) => {
            console.log(err.message)
        })
        return updatedPostList
    }
    post = () =>
    {
        console.log("I am trying to post something ...")
        console.log(this.props.myUsername)
        console.log(this.props.loggedInID)
        console.log(this.props.destUsername)
        console.log(this.state.message)
        const object = {
            myUsername: this.props.myUsername,
            loggedInID: this.props.loggedInID,
            destUsername: this.props.destUsername,
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
            console.log("New postlist detected. Updating posts...")
            this.setState({postList: updatedPostList, message: ""})
        }).catch((err) => {
            console.log(err.message)
        })
    }

    componentDidMount(){
        this.myInterval = setInterval(async () => {
        let updatedPostList = await this.updatePostList()
        if(JSON.stringify(updatedPostList) !== JSON.stringify(this.state.postList) )
        {
            console.log("New postlist detected. Updating posts...")
            this.setState({postList: updatedPostList})
        }
        else{
            console.log("There is no new postlist.") 
        }
        
    }, 35000)
    }
    componentWillUnmount()
    {
        clearInterval(this.myInterval)
    }

    render() {
        let element = this.state.postList.map((post) => (
             <Post key = { post.time } body = { post.body } ownerFirstname = { post.ownerFirstname }
             ownerLastname = { post.ownerLastname } ownerUsername = { post.ownerUsername } time = { post.time }/> 
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
