import React, { Component } from 'react'

export class Post extends Component {
    render() {
        let time = new Date(this.props.time)
        return (
            <div className="shadow-box primary-box animation2 p-4 mt-3" style= {{ minheight: "150px"}}>
                <h4>{ this.props.ownerFirstname } { this.props.ownerLastname } ( { this.props.ownerUsername } ) </h4>
                <h6>{ time.toLocaleString("af-ZA") }</h6>
                <p>{ this.props.body }</p>
            </div>
        )
    }
}

export default Post
