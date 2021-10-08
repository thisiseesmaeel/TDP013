import React, { Component } from 'react'

export class Post extends Component {
    render() {
        return (
            <div className="test p-2 mb-3" style= {{ height: "150px"}}>
                <h5>{ this.props.owner }</h5>
                <h6>{ this.props.time }</h6>
                <p>{ this.props.body }</p>
            </div>
        )
    }
}

export default Post
