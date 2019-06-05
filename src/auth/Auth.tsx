import auth0 from 'auth0-js';
import history from '../history';
import { AUTH_CONFIG } from './auth.config';

export default class Auth {
	auth0 = new auth0.WebAuth({
		domain: AUTH_CONFIG.domain,
		clientID: AUTH_CONFIG.clientID,
		redirectUri: AUTH_CONFIG.callbackUrl,
		responseType: 'token id_token'
	});

	accessToken : string | undefined | null;
	idToken : string | undefined | null;
	expiresAt : number | undefined | null;
	userInfo: auth0.Auth0UserProfile | undefined;

	constructor() {
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
		this.isAuthenticated = this.isAuthenticated.bind(this);
		this.getAccessToken = this.getAccessToken.bind(this);
		this.getIdToken = this.getIdToken.bind(this);
		this.renewSession = this.renewSession.bind(this);
	}

	login() {
		this.auth0.authorize();
	}

	handleAuthentication() {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
			} else if (err) {
				history.replace('/salon/1');
				console.log(err);
				alert(`Error: ${err.error}. Check the console for further details.`);
			}
		});
	}

	getAccessToken() {
		return this.accessToken;
	}

	getIdToken() {
		return this.idToken;
	}

	setSession(authResult: auth0.Auth0DecodedHash) {
		// Set isLoggedIn flag in localStorage
		localStorage.setItem('isLoggedIn', 'true');

		// Set the time that the Access Token will expire at
		let expiresAt = ((authResult.expiresIn ? authResult.expiresIn : 1) * 1000) + new Date().getTime();
		this.expiresAt = expiresAt;
		this.accessToken = authResult.accessToken;
		this.idToken = authResult.idToken;
		if (authResult.accessToken) {
			this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
				this.userInfo = user;
				localStorage.setItem("contextAuthorKey", user.name)
				localStorage.setItem("contextPdpKey", user.picture)
				localStorage.setItem("contextIdKey", user.sub.split('|', 2)[1])

				// navigate to the home route
				history.replace('/salon/1');
			})
		}
	}

	renewSession() {
		this.auth0.checkSession({}, (err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
			} else if (err) {
				this.logout();
				console.log(err);
				alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
			}
		});
	}

	logout() {
		// Remove tokens and expiry time
		this.accessToken = null;
		this.idToken = null;
		this.expiresAt = 0;

		// Remove isLoggedIn flag from localStorage
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('contextIdKey');
		localStorage.removeItem('contextPdpKey');

		this.auth0.logout({
		returnTo: 'http://localhost:3000/salon/1'
		});

		// navigate to the home route
		history.replace('/salon/1');
	}

	isAuthenticated() {
		// Check whether the current time is past the
		// access token's expiry time
		let expiresAt = this.expiresAt;
		return (expiresAt ? new Date().getTime() < expiresAt : false);
	}
}