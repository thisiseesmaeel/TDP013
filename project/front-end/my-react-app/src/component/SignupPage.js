import React, { Component } from 'react'

export class SignupPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstname: 'Pontus',
            lastname: 'Haglund',
            email: 'ph@liu.se',
            username: 'pontus1',
            password: '1'
        }

        this.handleChangeFirstname = this.handleChangeFirstname.bind(this)
        this.handleChangeLastname = this.handleChangeLastname.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)

        this.signup = this.signup.bind(this)
    }

    handleChangeFirstname(event) {
        this.setState({ firstname: event.target.value })
    }


    handleChangeLastname(event) {
        this.setState({ lastname: event.target.value });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }
    
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    signup = () => {
        console.log("I am trying to signup ... ")

        const object = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        fetch("http://localhost:3000/signup", {
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
            console.log("HEREEEEEEEEEEE")
            console.log(data)
            this.props.changePage("profile-page", data)
        }).catch((err) => {
            console.log('Error! Could not create an account.')
            console.log(err.message)
        })
        
    }
    render() {
        return (
            <div>
                <div className="border border-danger p-4">

                <div className="form-group w-25">
                <label htmlFor="firstName">First Name: </label>
                <input type="text" className="form-control" value = { this.state.firstname } onChange ={ this.handleChangeFirstname } id="firstName" placeholder="Enter your first name"/>
                </div>

                <div className="form-group w-25">
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" className="form-control" value = { this.state.lastname } onChange ={ this.handleChangeLastname } id="lastName" placeholder="Enter your last name"/>
                </div>

                <div className="form-group w-25">
                <label htmlFor="userName">Email: </label>
                <input type="text" className="form-control" value = { this.state.email } onChange ={ this.handleChangeEmail } id="email" placeholder="Enter your email-address"/>
                </div>

                <div className="form-group w-25">
                <label htmlFor="userName">Username: </label>
                <input type="text" className="form-control" value = { this.state.username } onChange ={ this.handleChangeUsername} id="userName" placeholder="Create your username"/>
                </div>

                <div className="form-group w-25">
                    <label htmlFor="password">Password: </label>
                    <input type="text" className="form-control" value = {this.state.password} onChange ={ this.handleChangePassword } id="password" placeholder="Create a password"/>
                </div>

                <div className="text-center p-3"><button className="w-50 btn btn-primary" onClick = { this.signup }>Sign up</button></div>


                </div>
            </div>
        )
    }
}

export default SignupPage
