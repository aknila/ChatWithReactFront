import React from 'react';
import { Stack, TextField, PrimaryButton } from 'office-ui-fabric-react';
import { AppContext } from '../AppContext';

interface AppFooterState {
	message: string | undefined;
}

const spacing = {
	childrenGap: 10
}

export class AppFooter extends React.Component<any, AppFooterState> {
	constructor(props: any) {
		super(props);
		this.state = {
			message: undefined
		};
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
			this.context.sendMessage((this.context.author ? this.context.author : 'Anonyme'), this.state.message, this.context.id, this.context.pdp);
			this.setState({ message: undefined });
		}
	}

	private onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) : void => {
		this.setState({ message: newValue});
	};

	render() {
		return (
			<Stack horizontal horizontalAlign="center" padding={10} tokens={spacing}>
				<Stack.Item align="center">
					<TextField id="sendInput" multiline={false} resizable={false} placeholder="Type message..." value={this.state.message} onChange={this.onChange} onKeyUp={this.keyPress}/>
				</Stack.Item>
				<Stack.Item align="center">
					<PrimaryButton id="sendButton" text="Send" onClick={this.sendNewMessage}/>
				</Stack.Item>
			</Stack>
		);
	}
}

AppFooter.contextType = AppContext;