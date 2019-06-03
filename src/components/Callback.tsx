import React from 'react';
import Auth from '../auth/Auth';

export class Callback extends React.Component<any, any> {

    render() {
        const auth: Auth = this.props.auth;
        auth.handleAuthentication();
        
        return (
            <div></div>
        )
    }
};