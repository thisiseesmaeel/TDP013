import React, { Component } from 'react'

export class LoginPage extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = {page: this.props.page}

    // this.changePage = this.changePage.bind(this)
    // }
    render() {
        return (
            <div>
                <div className="border border-danger p-4">
                
                <div className="form-group w-25">
                <label htmlFor="userName">Username: </label>
                <input type="text" className="form-control" id="userName" placeholder="Enter your username"/>
                </div>

                <div className="form-group w-25">
                    <label htmlFor="password">Password: </label>
                    <input type="text" className="form-control" id="password" placeholder="Enter your password"/>
                </div>

                <div className="text-center p-3"><button onClick = { () => this.props.changePage("profile-page") } className="w-50 btn btn-primary">Log In</button></div>
                
                
                </div>
            </div>
        )
    }
}

export default LoginPage
