import React from 'react';
import './App.css';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { AppMessageList } from './components/AppMessageList';
import { AppContext } from './AppContext';
import socketIOClient from "socket.io-client";
import uuid from 'uuidv4';
import moment from 'moment';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

let index = 3;

export class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			list: {
				'1': {
					author: 'Anthony',
					text: 'Hey',
					aid: 'nope',
					pdp: null,
					date: null,
					uid: null
				},
				'2': {
					author: 'Jack',
					text: 'Bonsoir',
					aid: 'nope',
					pdp: null,
					date: null,
					uid: null
				}
			},
			lastEvent: '',
			author: '',
			endpoint: 'http://127.0.0.1:4001',
			response: false,
			socket: null,
			count: 1,
			id: uuid(),
			pdp: ''
		}
	}

	_isMounted = false;

	// Permet de garder a jour le nombre de personnes connectées
	updateData = (data: {count: number}) : void => {
		if (this._isMounted) {
			this.setState({count: data.count});
		}
	}

	// Quand le component est pret, lance la connexion via socket avec le server
	// Et bind les messages d'ecoute sur cette connexion
  	componentDidMount() {
		this._isMounted = true;
		const { endpoint } = this.state;
		const socket = socketIOClient(endpoint);
		socket.on("chat message", (data: {author: string, text: string, id: string, pdp: string | null, uid: string}) : void => {this._newMessage(data.author, data.text, data.id, data.pdp, data.uid)});
		socket.on('new on', this.updateData);
		socket.on('new off', this.updateData);
		socket.on('delete message', this._deleteMessage);
		socket.on('edit message', this._editMessage);
		if (this._isMounted) {
			this.setState({
				socket: socket
			})
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render () {
		const { list, author, count, id, pdp } = this.state;
		return (
			<div className="App">
				<AppContext.Provider value={{
						list: list,
						author: author,
						count: count,
						id: id,
						pdp: pdp,
						sendMessage: this._sendMessage,
						changeName: this.changeName,
						changeUrl: this.changeUrl,
						editMessage: this._wEditMessage,
						deleteMessage: this._wDeleteMessage
					}}>
					<AppHeader />
					<AppMessageList lastEvent={this.state.lastEvent}/>
					<AppFooter />
				</AppContext.Provider>
			</div>
		);
	}

	// Lance au serveur un event d edition de message
	private _wEditMessage = (uid: string, text: string) => {
		if (this._isMounted) {
			this.state.socket.emit('edit message', {uid: uid, text: text});
		}
	}

	// Lance au serveur un event de suppression de message
	private _wDeleteMessage = (uid: string) => {
		if (this._isMounted) {
			this.state.socket.emit('delete message', {uid: uid});
		}
	}

	// Reçois les infos depuis le serveur sur le message a editer
	private _editMessage = (data: {uid: string, text: string}) => {
		if (this._isMounted) {
			const { list } = this.state;
			let copy = list;
			const keys = Object.keys(list);
			const newList = keys.filter(id => (list[id].uid === data.uid))
			copy[newList[0]].text = data.text;
			this.setState({
				list: copy,
				lastEvent: 'edit'
			})
		}
	}

	// Reçois les infos depuis le serveur sur le message a supprimer
	private _deleteMessage = (data: {uid: string}) => {
		if (this._isMounted) {
			const { list } = this.state;
			let copy = list;
			const keys = Object.keys(list);
			const newList = keys.filter(id => (list[id].uid === data.uid))
			delete copy[newList[0]];
			this.setState({
				list: copy,
				lastEvent: 'delete'
			})
		}
	}

	// Lance au serveur un event de nouveau message
	private _sendMessage = (author: string, text: string, id: string, pdp: string | null) => {
		if (this._isMounted) {
			this.state.socket.emit('chat message', {author: author, text: text, id: id, pdp: pdp, uid: uuid()})
		}
	}

	// Reçois les infos depuis le serveur sur l arrivée d un nouveau message
	private _newMessage = (author: string, text: string, id: string, pdp: string | null, uid: string) => {
		if (this._isMounted) {
		
			const { list } = this.state;
			const listId = index++;

			const now = moment().format("hh:mm A").toString();
	
			this.setState({
				list: {...list, [listId]: {author: author, text: text, aid: id, pdp: pdp, date: now, uid: uid}},
				lastEvent: 'new'
			})
		}
	}

	// Permet au panel dans le header de changer les valeurs pour le nom et l url de la pdp
	private changeName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) : void => {
		if (this._isMounted) {
			this.setState({
				author: newValue
			})
		}
	};

	private changeUrl = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) : void => {
		if (this._isMounted) {
			this.setState({
				pdp: newValue
			})
		}
	};
}

export default App;
