import React, { Component } from 'react';
import AuthService from './AuthService'

export default function withAuth(AuthComponent) {
      const Auth = new AuthService
    //    const Auth = new AuthService('http://27.131.138.143:3000');
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                
            }
        }
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                   
                }
                catch (err) {
                    Auth.logout()
                    this.props.history.replace('/login')
                }
            }
        }

        render() {
            if (this.props.history) {
                return (
                    <AuthComponent history={this.props.history} />
                )
            }
            else {
                return null
            }
        }
    };
}