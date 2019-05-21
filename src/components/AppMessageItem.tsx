import React from 'react';
import { Label, Stack, Text, IconButton, TextField } from 'office-ui-fabric-react';
import { AppContext } from '../AppContext';

export class AppMessageItem extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			edit: false,
			tmp: null,
			newText: null
		}
	}

	// Active le mode edit, garde une copie du message original et initialise la value de l input avec le meme texte
	private editMsg = (text: string) => {
		this.setState({
			edit: true,
			tmp: text,
			newText: text
		})

	}

	// 13: Touche entrée pour valider / 27: Echap pour annuler l edition
	private keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.keyCode === 13) {
			this.validEditMessage();
		}
		if (event.keyCode === 27) {
			this.setState({
				edit: false,
				tmp: null,
				newText: null
			})	
		}
	}
	
	// Valide la fin de l edition du message, dans le cas d une modification qui rend le message vide, il est alors supprimé
	private validEditMessage = () => {
		const { newText } = this.state
		this.setState({
			edit: false,
			tmp: null,
			newText: null
		})
		if (newText) {
			this.context.editMessage(this.props.uid, newText)
		} else {
			this.context.deleteMessage(this.props.uid)
		}
	}

	// Met a jour la variable du nouveau message pour chaque modification du texte
	private onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) : void => {
		this.setState({ newText: newValue});
	};

	render() {
		const { author, text, id, aid, date, uid } = this.props;
		const style = {
			root: {
				fontSize: '10px',
				color: '#ffffff',
				padding: 0
			}
		}
		let button;

		// Permet de mettre en place les options si on est l auteur du message
		if (aid === this.context.id) {
			button = <IconButton
				data-automation-id="test"
				text=""
				splitButtonAriaLabel={'See 2 sample options'}
				aria-roledescription={'split button'}
				style={{ height: '35px' }}
				menuProps={{
					items: [
						{
							key: 'editMessage',
							text: 'Edit',
							iconProps: { iconName: 'CodeEdit' },
							onClick: () => this.editMsg(text)
						},
						{
							key: 'deleteMessage',
							text: 'Delete',
							iconProps: { iconName: 'Delete' },
							onClick: () => this.context.deleteMessage(uid)
						}
					]
				}}
		  />
		}
		let textInput;
		// Selon si on est en edit ou non, rend un component input ou text
		if (this.state.edit) {
			textInput = <TextField className="inputEditContainer" inputClassName="inputEdit" borderless multiline={false} resizable={false} id={id} value={this.state.newText} onChange={this.onChange} onKeyUp={this.keyPress} />
		} else {
			textInput = <Text id={id}>{text}</Text>
		}
		return (
			<div>
				<Stack horizontal>
					<Stack id="messageItem" className={aid === this.context.id ? "containerItemAuthor" : "containerItem"} padding={7}>
						<Label styles={style} htmlFor={id}>{author}#{aid.substring(0, 4)} {date}</Label>
						{textInput}
					</Stack>
					<div>
						{button}
					</div>
				</Stack>
			</div>
		)
	}
}

AppMessageItem.contextType = AppContext;