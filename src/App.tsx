import React from 'react';
import './App.css';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { AppMessageList } from './components/AppMessageList';
import { AppContext } from './AppContext';
import socketIOClient from "socket.io-client";
import uuid from 'uuidv4';
import { Link } from 'office-ui-fabric-react';
import moment from 'moment';
import { initializeIcons } from '@uifabric/icons';
import { Message } from './App.types';
// import Auth from './auth/Auth';
initializeIcons();

let index = 1;

export class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			list: {},
			lastEvent: '',
			author: localStorage.getItem("contextAuthorKey"),
			endpoint: 'http://212.47.251.157:4001',
			// endpoint: 'http://172.24.111.88:4001',
			// endpoint: 'http://127.0.0.1:4001',
			socket: null,
			count: 1,
			id: localStorage.getItem("contextIdKey"),
			pdp: localStorage.getItem("contextPdpKey")
		}
		// const auth: Auth = new Auth();
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
		let stateId = (this.state.id ? this.state.id : uuid());
		let stateAuthor = (this.state.author ? this.state.author : '');
		let statePdp = (this.state.pdp ? this.state.pdp : '');
		const { endpoint } = this.state;
		const id = this.props.salonId;
		const socket = socketIOClient(endpoint + '/salon' + (id > 0 && id <= 5 ? id : '1'));
		socket.on('history', this._getHistory)
		socket.on("chat message", (data: Message) : void => {this._newMessage(data)});
		socket.on('new on', this.updateData);
		socket.on('new off', this.updateData);
		socket.on('delete message', this._deleteMessage);
		socket.on('edit message', this._editMessage);
		if (this._isMounted) {
			this.setState({
				socket: socket,
				id: stateId,
				pdp: statePdp,
				author: stateAuthor
			})
		}
	}

	componentDidUpdate(prevProps: any, prevState: any) {
		if (this.state.id !== prevState.id) {
			localStorage.setItem("contextIdKey", this.state.id)
		}
		if (this.state.author !== prevState.author) {
			localStorage.setItem("contextAuthorKey", this.state.author)
		}
		if (this.state.pdp !== prevState.pdp) {
			localStorage.setItem("contextPdpKey", this.state.pdp)
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render () {
		const { list, author, count, id, pdp, endpoint } = this.state;

		const style = {
			root: {
				padding: 5
			}
		};

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
						deleteMessage: this._wDeleteMessage,
						endpoint: endpoint
					}}>
					<AppHeader />
					<Link styles={style} onClick={this.loadMore}>Load more</Link>
					<AppMessageList lastEvent={this.state.lastEvent}/>
					<AppFooter />
				</AppContext.Provider>
			</div>
		);
	}

	private loadMore = () => {
		if (this._isMounted) {
			let len = Object.keys(this.state.list).length + 5;
			this.state.socket.emit('history', {len: len})
		}
	}

	private _getHistory = (data: {save: Message[]}) => {
		if (this._isMounted) {

			// const { list } = this.state;
			let newList = {};

			data.save.forEach((elem) => {
				let listId = index++;
				newList = {...newList, [listId]: { author: elem.author, text: elem.text, aid: elem.aid, pdp: elem.pdp, date: elem.date, uid: elem.uid, type: elem.type, link: elem.link }}
			})

			this.setState({
				list: newList
			})
		}
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
			if (newList && newList.length > 0 && copy[newList[0]]) {
				copy[newList[0]].text = data.text;
				this.setState({
					list: copy,
					lastEvent: 'edit'
				})
			}
		}
	}

	// Reçois les infos depuis le serveur sur le message a supprimer
	private _deleteMessage = (data: {uid: string}) => {
		if (this._isMounted) {
			const { list } = this.state;
			let copy = list;
			const keys = Object.keys(list);
			const newList = keys.filter(id => (list[id].uid === data.uid))
			if (newList && newList.length > 0 && copy[newList[0]]) {
				delete copy[newList[0]];
				this.setState({
					list: copy,
					lastEvent: 'delete'
				})
			}
			if (Object.keys(copy).length < 7) {
				this.state.socket.emit('history', {len: 7})
			}
		}
	}

	// Lance au serveur un event de nouveau message
	private _sendMessage = (author: string, text: string, aid: string, pdp: string | null, type: string, link: string | null) => {
		if (this._isMounted) {
			const now = moment().format("hh:mm A").toString();
			this.state.socket.emit('chat message', {author: author, text: text, aid: aid, pdp: pdp, uid: uuid(), date: now, type: type, link: link})
		}
	}

	// Reçois les infos depuis le serveur sur l arrivée d un nouveau message
	private _newMessage = (data: Message) => {
		if (this._isMounted) {

			const { list } = this.state;
			const listId = index++;

			this.setState({
				list: {...list, [listId]: {author: data.author, text: data.text, aid: data.aid, pdp: data.pdp, date: data.date, uid: data.uid, type: data.type, link: data.link}},
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
