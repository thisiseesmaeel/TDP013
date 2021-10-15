import React, { Component } from 'react'
import FoundUser from './FoundUser'
export class FoundUserList extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            foundUsers: [],
            query: "",
            errorMessage: null
        }
        
        this.isValidInput = this.isValidInput.bind(this)
        this.handleQueryChange = this.handleQueryChange.bind(this)
        this.find = this.find.bind(this)
    }

    isValidInput(input) {
        let letters = /^[a-z A-Z ÄÖÅ äöå]+$/
        if(input.match(letters) && input.length <= 50 )
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
    
    handleQueryChange = (event) => {
        this.setState({query: event.target.value})
    }

    find = () => {
        if(!this.isValidInput(this.state.query))
        {
            this.setState({errorMessage : "Only space and alphabet are allowed (including Swedish characters). It must be less than 50 characters.", 
            foundUsers: []})
        }
        else{
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
                this.setState({foundUsers: data, errorMessage : null})
            }).catch((err) => {
                this.setState({foundUsers: [], errorMessage : null})
                console.log(err.message)
            })
        }  
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
                <div className = "text-center mx-auto w-50" style = {{color: "red"}}> { this.state.errorMessage } </div>
                { element }
            </div>
        )
    }
}

export default FoundUserList
