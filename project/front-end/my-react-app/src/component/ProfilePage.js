import React, { Component } from 'react'

export class ProfilePage extends Component {
    render() {
        return (
            <div>
                <div className="test p-3">
                    <h1 className = "text-primary">Welcome user1</h1>
                </div>
                <div className="test text-center p-3">
                    <button className="w-25 btn btn-primary" onClick = {() => this.props.changePage("find-user-page")} >Find friend</button>
                </div>

                <div className ="test p-4 text-center">
                    <input type="text" className="w-75" style={{height: "35px"}} id="userName" placeholder="Post something..."/>
                    <button className="btn btn-primary">Post</button>
                </div>

                <div className="d-flex">
                    <div className="test w-25 mr-2 ml-2 p-2">
                        <h5>Friends list</h5>
                        <div className="test text-center p-1 mb-3">
                            <h6>User2</h6>
                            <button className="w-50 btn btn-primary mr-2 btn-sm">Show profile</button>
                        </div>
                        <div className="test text-center p-1 mb-3">
                            <h6>User3</h6>
                            <button className="w-50 btn btn-primary mr-2 btn-sm">Show profile</button>
                        </div>
                        <div className="test text-center p-1 mb-3">
                            <h6>User4</h6>
                            <button className="w-50 btn btn-primary mr-2 btn-sm">Show profile</button>
                        </div>
                        <div className="test text-center p-1 mb-3">
                            <h6>User5</h6>
                            <button className="w-50 btn btn-primary mr-2 btn-sm">Show profile</button>

                        </div>
                
                    </div>
                    <div className="test w-50 mr-2 p-2" style={{ minHeight: "600px" }}>
                        <h5>Timeline </h5>
                    <div className="test p-2 mb-3" style= {{ height: "150px"}}>
                        <h6>Post 1</h6></div>
                    <div className="test p-2 mb-3" style= {{ height: "150px" }}>
                        <h6>Post 2</h6></div>
                    </div>
                    
                    <div className="test w-25 mr-2 p-2">
                        <h5>Friend Requests</h5>
                        <div className="test mt-4 p-3">
                        <h6>User1</h6>
                        <div className="d-flex">
                            <button className="w-50 btn btn-success mr-2 btn-sm">Accept</button>
                            <button className="w-50 btn btn-danger mr-2 btn-sm">Ignore</button>
                        </div>
                            
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default ProfilePage
