import React, { Component } from 'react'
import FoundUserList from './FoundUserList'

export class FindUserPage extends Component {
    constructor(props){
        super(props)

        this.logout = this.logout.bind(this)
        this.showProfile = this.showProfile.bind(this)
    }

    logout = async () => {
        const object = {
            myUsername: this.props.data.username,
            loggedInID: this.props.data.loggedInID
        }
        await fetch("http://localhost:3000/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(object)
        }).then((res) => 
        {   
            if(!res.ok) {throw new Error(res.status)}
        }).catch((err) => {
            console.log(err.message)
        })

        this.props.changePage("start-page")
    }

    showProfile = () => {
        const object = {
            myUsername: this.props.data.username,
            loggedInID: this.props.data.loggedInID
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
                <div className="primary-box p-3 topheader">
                    <div className="d-flex justify-content-between ">
                        <h1>Welcome { this.props.data.firstname }</h1>
                        <div className = "d-flex justify-content-around" style ={{ width: "200px"}}>
                            <button className="btn btn-primary btn-sm" style = {{ borderColor: "white" }} onClick = { this.showProfile }> My profile </button>
                            <button className="btn btn-danger btn-sm" onClick = { this.logout }> Logout </button>
                        </div>
                    </div>
                </div>
                <FoundUserList data = { this.props.data }/>          
            </div>
        )
    }
}

export default FindUserPage
