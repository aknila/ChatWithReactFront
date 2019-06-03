import React from 'react';
import Auth from '../auth/Auth';

export class Login extends React.Component<any, any> {

    render() {
        const auth: Auth = this.props.auth;
        auth.alreadyLoged();

        return (
            <div></div>
        )
    }
};