import React, { Component } from 'react'
import PostList from './PostList'

export class FriendPage extends Component {
    constructor(props){
        super(props)

        this.showProfile = this.showProfile.bind(this)
    }

    showProfile = () => {
        const object = {
            myUsername: this.props.myUsername,
            loggedInID: this.props.loggedInID
        }
        fetch("http://localhost:3000/myprofile", {
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
            this.props.changePage("profile-page", data)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    render() {
        return (
        <div>
            <div className = "primary-box p-3 topheader d-flex justify-content-between">
                <h1>{ this.props.data.firstname } { this.props.data.lastname }'s page</h1>
                <button className="btn btn-primary btn-sm" style = {{ borderColor: "white" }} onClick = { this.showProfile }> My profile </button>
            </div>
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
