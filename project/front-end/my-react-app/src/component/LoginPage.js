import React, { Component } from 'react'

export class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state = 
        {

            username: '',
            password: '',
            errorMessage: ''
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.login = this.login.bind(this);
    }
    
    componentDidMount(){
        console.log("Login page is loaded!")
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    login(){
        console.log("I am trying to log in ... ")
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(this.state)
        }).then((res) => 
        {   
            if(!res.ok) {throw new Error(res.status)}
            return res.json()
        })
        .then((data) => {
            //console.log(data)
            this.props.changePage("profile-page", data)
        }).catch((err) => {
            this.setState({errorMessage: 'Error! Wrong username or password.'})
            console.log(err.message)
        })
        
    }
    render() {
        return (
            <div>
                <div className="border border-danger p-4">
                
                <div className="form-group w-25">
                <label htmlFor="userName">Username: </label>
                <input type="text" value = { this.state.username } onChange={ this.handleChangeUsername } className="form-control" id="userName" placeholder="Enter your username"/>
                </div>

                <div className="form-group w-25">
                    <label htmlFor="password">Password: </label>
                    <input type="text" value = { this.state.password } onChange={ this.handleChangePassword }  className="form-control" id="password" placeholder="Enter your password"/>
                </div>
                <div style = {{ color: "red" }}> { this.state.errorMessage } </div>
                <div className="text-center p-3"><button onClick = { this.login } className="w-50 btn btn-primary">Log In</button></div>
                
                
                </div>
            </div>
        )
    }
}

export default LoginPage
