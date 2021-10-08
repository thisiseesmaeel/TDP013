import React, { Component } from 'react'

export class SignupPage extends Component {
    render() {
        return (
            <div>
                <div className="border border-danger p-4">

                <div className="form-group w-25">
                <label htmlFor="firstName">First Name: </label>
                <input type="text" className="form-control" id="firstName" placeholder="Enter your first name"/>
                </div>

                <div className="form-group w-25">
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" className="form-control" id="lastName" placeholder="Enter your last name"/>
                </div>

                <div className="form-group w-25">
                <label htmlfor="userName">Username: </label>
                <input type="text" className="form-control" id="userName" placeholder="Create your username"/>
                </div>

                <div className="form-group w-25">
                    <label htmlfor="password">Password: </label>
                    <input type="text" className="form-control" id="password" placeholder="Create a password"/>
                </div>

                <div className="text-center p-3"><button className="w-50 btn btn-primary">Sign up</button></div>


                </div>
            </div>
        )
    }
}

export default SignupPage
