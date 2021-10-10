import React, { Component } from 'react'

import StartPage from './StartPage'
import SignupPage from './SignupPage'
import LoginPage from './LoginPage'
import ProfilePage from './ProfilePage'
import FindUserPage from './FindUserPage'
import FriendPage from './FriendPage'
//plugin

export class Page extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            page: "start-page",
            data: {},
            myUsername: null,
            loggedInID: null
        }
        this.setMyCred = this.setMyCred.bind(this)
        this.changePage = this.changePage.bind(this)
    }

    setMyCred = (myUsername, loggedInID) => {
        this.setState({ myUsername, loggedInID})  
    }
    changePage = (param, data = {}) => {
        console.log("Change page clicked!")
        console.log(data)
        this.setState({ page : param, data : data})
    }

    render() {
        switch(this.state.page){
            case "start-page":
                return <StartPage changePage = { this.changePage }/>
            case "signup-page":
                return <SignupPage changePage = { this.changePage }/>
            case "login-page":
                return <LoginPage changePage = { this.changePage }/>
            case "profile-page":
                return <ProfilePage changePage = { this.changePage } setMyCred = { this.setMyCred } data = { this.state.data }/>
            case "find-user-page":
                return <FindUserPage changePage = {this.changePage} />
            case "friend-page":
                return <FriendPage changePage = {this.changePage} data = { this.state.data }
                myUsername = { this.state.myUsername } loggedInID = { this.state.loggedInID }/>
            default:
                return <h1>Undefined page!</h1>
        }
    }
}

export default Page
