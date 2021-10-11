import React, { Component } from 'react'
import FoundUser from './FoundUser'
export class FoundUserList extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            foundUsers: [],
            query: "",
        }
        this.handleQueryChange = this.handleQueryChange.bind(this)
        this.find = this.find.bind(this)
    }

    handleQueryChange = (event) => {
        this.setState({query: event.target.value})
    }

    find = () => {
        console.log("Trying find some new friends for you...")
        const object = {
            myUsername: this.props.data.username,
            loggedInID: this.props.data.loggedInID,
            user: this.state.query
        }
        fetch("http://localhost:3000/finduser", {
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
            this.setState({foundUsers: data})
        }).catch((err) => {
            console.log(err.message)
        })
    }
    render() {
        const element = this.state.foundUsers.map((foundUser) => (
            <FoundUser key = { foundUser.username } firstname = { foundUser.firstname } lastname = { foundUser.lastname }
            username = { foundUser.username } myUsername = { this.props.data.username } loggedInID = { this.props.data.loggedInID }/> 
           ))
        return (
            <div>
                <div className ="primary-box p-4 text-center">
                    <input type="text" className="w-75" value = { this.state.query } onChange = { this.handleQueryChange }
                     style={{height: "35px"}} id="userName" placeholder="Search for someone..."/>
                    <button className="btn btn-primary" onClick = { this.find } >Search</button>
                </div> 
                { element }
            </div>
        )
    }
}

export default FoundUserList
