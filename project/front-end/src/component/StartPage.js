import React, { Component } from 'react'

export class StartPage extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center text-primary mt-5">Facebook 2.0</h1>
                <div className="d-flex flex-column w-25 mx-auto mt-5">
                <div className="text-center p-2"><button onClick={() => this.props.changePage("login-page") } className="w-50 btn btn-primary">Login</button></div>
                <div className="text-center p-2"><button onClick= {() => this.props.changePage("signup-page") } className="w-50 btn btn-primary">Sign up</button></div>
                </div>
            </div>
        )
    }
}

export default StartPage
