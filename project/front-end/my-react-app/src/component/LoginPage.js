import React, { Component } from 'react'

export class LoginPage extends Component {
    constructor(props){
        super(props)
        this.state = 
        {
            username: '',
            password: ''
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.login = this.login.bind(this);
    }
    componentDidMount(){
        // fetch("http://localhost:3000/login", {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //       },
        //     body: JSON.stringify()
        // }).then(res => res.json()).then((data) => {
        //     console.log(data)
        // }).catch((err) => {
        //     console.log(err)
        // })
        console.log("Login page is loaded!")
    }

    handleChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    login(){
        // console.log(this.state.username)
        // let obj = 
        // {
        //     username: "ismail222",
        //     password: "user111"
        // }

        console.log("I am trying to log in ... ")
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(this.state)
        }).then(res => res.json()).then((data) => {
            console.log(data)
        }).catch(err => console.log(err))

        this.props.changePage("profile-page");
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

                <div className="text-center p-3"><button onClick = { this.login } className="w-50 btn btn-primary">Log In</button></div>
                
                
                </div>
            </div>
        )
    }
}

export default LoginPage
