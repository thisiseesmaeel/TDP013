import React, { Component } from 'react'

export class FindUserPage extends Component {
    render() {
        return (
            <div>
                <div className ="test p-4 text-center">
                <input type="text" className="w-75" style={{height: "35px"}} id="userName" placeholder=""/>
                <button className="btn btn-primary">Search</button>
                </div>
        
                <div className="test mt-4 p-3">
                <h2>User1</h2>
                <p>Blablabbla Blablabbla Blablabbla Blablabbla Blablabbla Blablabbla</p>
                <div className="text-center">
                <button className="w-50 btn btn-primary">Send Request</button>
                </div>
        
                </div>
            </div>
        )
    }
}

export default FindUserPage
