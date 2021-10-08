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
            page: "start-page"
        }
        this.changePage = this.changePage.bind(this)
    }

    changePage = (param) => {
        console.log("Change page clicked!")
        this.setState({ page : param })
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
                return <ProfilePage changePage = {this.changePage} />
            case "find-user-page":
                return <FindUserPage changePage = {this.changePage} />
            case "friend-page":
                return <FriendPage changePage = {this.changePage} />
            default:
                return <h1>Undefined page!</h1>
        }
    }
}

export default Page
