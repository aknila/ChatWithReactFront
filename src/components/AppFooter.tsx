import React from 'react';
import { Stack, TextField, PrimaryButton, IconButton } from 'office-ui-fabric-react';
import { AppContext } from '../AppContext';
import axios  from 'axios';

interface AppFooterState {
	message: string | undefined;
}

const spacing = {
	childrenGap: 10
}

export class AppFooter extends React.Component<any, AppFooterState> {

	myUploadRef: React.RefObject<HTMLInputElement>;

	constructor(props: any) {
		super(props);
		this.state = {
			message: undefined
		};
		this.myUploadRef = React.createRef<HTMLInputElement>();
	}

	// Valide le message si on appuis sur Entrée
	private keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.keyCode === 13) {
			this.sendNewMessage();
		}
	}
	
	// Envoi le message et vide le contenu de la variable message
	private sendNewMessage = () => {
		if (this.state.message) {
			this.context.sendMessage((this.context.author ? this.context.author : 'Anonyme'), this.state.message, this.context.id, this.context.pdp, 'message', null);
			this.setState({ message: undefined });
		}
	}

	private onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) : void => {
		this.setState({ message: newValue});
	};

	private clickUpload = () => {
		if (this.myUploadRef && this.myUploadRef.current) {
		  this.myUploadRef.current.click()
		}
	}

	private uploadFile = (file: FileList | null) => {
		if (file) {
			let data = new FormData();
			data.append('file', file[0]);
			axios.post(this.context.endpoint + "/upload", data)
      		.then(res => {
				let text = this.context.endpoint + '/static/' + res.data.filename.split(' ').join('%20');
				let link = res.data.originalname;
				this.context.sendMessage((this.context.author ? this.context.author : 'Anonyme'), text, this.context.id, this.context.pdp, 'file', link);
			})
		}
	}

	render() {

		return (
			<Stack horizontal horizontalAlign="center" padding={10} tokens={spacing}>
				<Stack.Item align="center">
					<IconButton iconProps={{ iconName: 'CirclePlus' }} title="Upload" onClick={this.clickUpload} />
				</Stack.Item>
				<Stack.Item align="center">
					<TextField id="sendInput" multiline={false} resizable={false} placeholder="Type message..." value={this.state.message} onChange={this.onChange} onKeyUp={this.keyPress}/>
				</Stack.Item>
				<Stack.Item align="center">
					<PrimaryButton id="sendButton" text="Send" onClick={this.sendNewMessage}/>
				</Stack.Item>
				<input ref={this.myUploadRef} style={{ display: "none" }} type="file" onChange={ (e) => this.uploadFile(e.target.files) } />
			</Stack>
		);
	}
}

AppFooter.contextType = AppContext;