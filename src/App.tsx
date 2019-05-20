import React from 'react';
import './App.css';
import { AppHeader } from './components/AppHeader';
import { AppFooter } from './components/AppFooter';
import { AppMessageList } from './components/AppMessageList';
import { AppContext } from './AppContext';
import socketIOClient from "socket.io-client";
import uuid from 'uuidv4';

let index = 3;

export class App extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			list: {
				'1': {
					author: 'Anthony',
					text: 'Hey',
					aid: 'nope'
				},
				'2': {
					author: 'Jack',
					text: 'Bonsoir',
					aid: 'nope'
				}
			},
			author: '',
			endpoint: 'http://127.0.0.1:4001',
			response: false,
			socket: null,
			count: 1,
			id: uuid()
		}
	}

	_isMounted = false;

	updateData = (data: {count: number}) : void => {
		if (this._isMounted) {
			this.setState({count: data.count});
		}
	}

  componentDidMount() {
		this._isMounted = true;
		const { endpoint } = this.state;
		const socket = socketIOClient(endpoint);
		socket.on("chat message", (data: {author: string, text: string, id: string}) : void => {this._newMessage(data.author, data.text, data.id)});
		socket.on('new on', this.updateData);
		socket.on('new off', this.updateData);
		this.setState({
			socket: socket
		})
	}
	
	componentWillUnmount() {
		this._isMounted = false;
	}

	render () {
		const { list, author, count, id } = this.state;
		return (
			<div className="App">
				<AppContext.Provider value={{
						list: list,
						author: author,
						count: count,
						id: id,
						sendMessage: this._sendMessage,
						changeName: this.changeName
					}}>
					<AppHeader />
					<AppMessageList />
					<AppFooter />
				</AppContext.Provider>
			</div>
		);
	}

	private _sendMessage = (author: string, text: string, id: string) => {
		this.state.socket.emit('chat message', {author: author, text: text, id: id})
	}

	private _newMessage = (author: string, text: string, id: string) => {
		const { list } = this.state;
		const listId = index++;

		this.setState({
			list: {...list, [listId]: {author: author, text: text, aid: id}}
		})
	}

	private changeName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) : void => {
		this.setState({
			author: newValue
			// author: (newValue ? newValue : 'Anonyme')
		})
	};
}

export default App;
