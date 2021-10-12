import React, { Component } from 'react'

export class SignupPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            errorMessage: null
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
            this.props.changePage("profile-page", data)
        }).catch((err) => {
            if(err.message === "409") { this.setState({errorMessage: "OBS! Username already exists."})}
        })
        
    }
    render() {
        return (
            <div>
                <div className="primary-box p-4">

                <div className="d-flex form-group w-50 mx-auto mb-4">
                    <label htmlFor="firstName" className = "w-25 pt-2"><strong>Firstname</strong></label>
                    <input type="text" className="form-control w-50" value = { this.state.firstname } onChange ={ this.handleChangeFirstname } id="firstName"/>
                </div>
                
                <div className="d-flex form-group w-50 mx-auto mb-4">
                    <label htmlFor="lastName" className = "w-25 pt-2"><strong>Last Name</strong></label>
                    <input type="text" className="form-control w-50" value = { this.state.lastname } onChange ={ this.handleChangeLastname } id="lastName" />
                </div>

                <div className="d-flex form-group w-50 mx-auto mb-4">
                    <label htmlFor="userName" className = "w-25 pt-2"><strong>Email</strong></label>
                    <input type="text" className="form-control w-50" value = { this.state.email } onChange ={ this.handleChangeEmail } id="email"/>
                </div>

                <div className="d-flex form-group w-50 mx-auto mb-4">
                    <label htmlFor="userName" className = "w-25 pt-2"><strong>Username</strong></label>
                    <input type="text" className="form-control w-50" value = { this.state.username } onChange ={ this.handleChangeUsername} id="userName" />
                </div>

                <div className="d-flex form-group w-50 mx-auto mb-4">
                    <label htmlFor="password" className = "w-25 pt-2" ><strong>Password</strong></label>
                    <input type="text" className="form-control w-50" value = {this.state.password} onChange ={ this.handleChangePassword } id="password" />
                </div>
                <div className = "text-center mx-auto w-50" style = {{color: "red"}}> { this.state.errorMessage } </div>
                <div className="d-flex justify-content-around w-25 mx-auto text-center p-3">
                    <button className="btn btn-primary" onClick = { this.signup }>Sign up</button>
                    <button className="btn btn-primary" onClick = {() => this.props.changePage("start-page") }>Back</button>
                </div>
                </div>
            </div>
        )
    }
}

export default SignupPage
