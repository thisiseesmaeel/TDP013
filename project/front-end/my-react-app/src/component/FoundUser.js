import React, { Component } from 'react'

export class FoundUser extends Component {
    render() {
        return (
            <div className = "row" >
                <div className = "col-md-8 mx-auto" >
                    <div className="test mt-4 p-3">
                        <h2>{ this.props.firstname } { this.props.lastname }</h2>
                        <p>Username: <strong> { this.props.username } </strong></p>
                        <div className="text-center">
                            <button className="w-50 btn btn-primary">Send friend Request</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default FoundUser
