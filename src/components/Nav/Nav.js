import React, { Component } from 'react'
import axios from 'axios';
import {withRouter} from 'react-router-dom'
export class Nav extends Component {

    logout = () => {
axios.delete('/auth/logout').then(() => {
    this.props.history.push('/'
    )
})
    }

    render() {
        return (
            <div>
                <h1>nav</h1>
            <button onClick={this.logout}>
                Logout
            </button>
            </div>
        )
    }
}

export default withRouter(Nav)
