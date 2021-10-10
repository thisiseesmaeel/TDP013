import React, { Component } from 'react'
import PostList from './PostList'

export class FriendPage extends Component {
    constructor(props){
        super(props)

        this.showProfile = this.showProfile.bind(this)
    }

    showProfile = () => {
        this.props.changePage("profile-page", this.props.extraData)
    }

    render() {
        return (
        <div>
            <div className = "test p-3 topheader d-flex justify-content-between">
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
