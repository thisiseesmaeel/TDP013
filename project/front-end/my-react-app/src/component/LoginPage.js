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
            this.props.changePage("profile-page", data)
        }).catch((err) => {
            this.setState({errorMessage: 'Error! Wrong username or password.'})
            console.log(err.message)
        })
        
    }
    render() {
        return (
            <>
            <h1 className="text-center text-primary mt-5">Facebook 2.0</h1>
            <div className= "d-flex flex-column w-50 mx-auto mt-4">
                <div className="p-4">
                    <div className="form-group w-50 mx-auto mb-4">
                        <input type="text" value = { this.state.username } onChange={ this.handleChangeUsername } className="form-control" id="userName" placeholder="Username"/>
                    </div>

                    <div className="form-group w-50 mx-auto mb-4">
                        <input type="text" value = { this.state.password } onChange={ this.handleChangePassword }  className="form-control" id="password" placeholder="Password"/>
                    </div>
                    <div className = "text-center" style = {{ color: "red" }}> { this.state.errorMessage } </div>
                    <div className="w-75 d-flex justify-content-around text-center p-3 mx-auto">
                        <button onClick = { this.login } className="w-25 btn btn-primary">Log In</button>
                        <button onClick = { () => this.props.changePage("start-page") } className="w-25 btn btn-primary">Back</button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default LoginPage
