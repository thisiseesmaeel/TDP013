import React, { Component } from 'react'
import FoundUserList from './FoundUserList'

export class FindUserPage extends Component {
    render() {
        return (
            <div>
                <FoundUserList data = { this.props.data }/>          
            </div>
        )
    }
}

export default FindUserPage
