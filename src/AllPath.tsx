import React from 'react';
import { Route, Router } from "react-router-dom";
import App from './App';
import Auth from './auth/Auth';
import Callback from './callback/Callback';
import history from './history';

const auth = new Auth();

const handleAuthentication = ( { location }: any ) => {
  if (/access_token|id_token|error/.test(location.hash)) {
		auth.handleAuthentication();
	} else {
		history.replace('/salon/1');
	}
}

const authOrNot = () => {
	if (!localStorage.getItem('isLoggedIn') && !auth.isAuthenticated()) {
		auth.login();
	}
}

export const AllPath = () => {
	return (
		<Router history={history}>
		  <div>
				<Route path="/salon/:salonId" render={(props) => {
					authOrNot();
				  return <App auth={auth} {...props} />
				}}/>
				<Route path="/callback" render={(props) => {
				  handleAuthentication(props);
				  return <Callback {...props} />
				}}/>
		  </div>
		</Router>
	);
}

export default AllPath;