import React, { Component } from 'react'

export class FoundUser extends Component {
    constructor(props){
        super(props)

        this.sendFriendRequest = this.sendFriendRequest.bind(this)
    }
    sendFriendRequest = ( ) => {
        console.log(`Sending friend request to ${ this.props.username }`)
        const object = {
            "myUsername": this.props.myUsername,
            "loggedInID": this.props.loggedInID,
            "otherFirstname": this.props.firstname,
            "otherLastname": this.props.lastname,
            "otherUsername": this.props.username
        }
        console.log(object)
        fetch("http://localhost:3000/sendrequest", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(object)
        }).then((res) => 
        {   
            if(!res.ok) {throw new Error(res.status)}
            console.log("Friend request sent!")
        }).catch((err) => {
            console.log(err.message)
        })
    } 
    render() {
        return (
            <div className = "row" >
                <div className = "col-md-8 mx-auto" >
                    <div className="test mt-4 p-3">
                        <h2>{ this.props.firstname } { this.props.lastname }</h2>
                        <p>Username: <strong> { this.props.username } </strong></p>
                        <div className="text-center">
                            <button className="w-50 btn btn-primary" onClick = { this.sendFriendRequest } >Send friend Request</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default FoundUser
