import React from 'react';
import { Router, Redirect } from "@reach/router"
import App from './App';
// import Auth from './auth/Auth';
// import { Login } from './components/Login';
// import { Callback } from './components/Callback';

export class AllPath extends React.Component<any, any> {
	// constructor(props: any) {
	// 	super(props);
	// 	this.state = {
	// 		auth: new Auth()
	// 	}
	// }

	render() {
		// const { auth } = this.state;

		return (
			<Router>
				{/* <Login path="login" auth={auth}/> */}
				{/* <Callback path="callback" auth={auth}/> */}
				<Redirect noThrow from="*" to="/salon/1" />
				<App path="/salon/:salonId"/>
			</Router>
		)
	}
};

export default AllPath;