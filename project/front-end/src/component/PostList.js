import React, { Component } from 'react'
import Post from './Post'

export class PostList extends Component {
    constructor(props){
        super(props)
        this.state = {
            postList: this.props.postList,
            message: "",
            myInterval: null,
            errorMessage: null
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

        if(this.state.message.length <= 0 || this.state.message.length > 140)
        {
            this.setState({errorMessage: "You cannot post an empty message or a message with more than 140 characters."})
        }
        else{
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
                this.setState({postList: updatedPostList, message: "", errorMessage: null})
            }).catch((err) => {
                console.log(err.message)
            })

        }
        
    }

    componentDidMount(){
        this.myInterval = setInterval(async () => {
            let updatedPostList = await this.updatePostList()
            if(JSON.stringify(updatedPostList) !== JSON.stringify(this.state.postList) ){
                this.setState({postList: updatedPostList})
                }
            }, 10000)
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
            <div className = "text-center mx-auto w-50" style = {{color: "red"}}> { this.state.errorMessage } </div> 
                { element } 
            </div>
          
        </div>
        )
    }
}

export default PostList
