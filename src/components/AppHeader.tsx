import React from 'react';
import { Stack, Text, TextField, Label, Panel, DefaultButton, Image, IImageProps, ImageFit, Link } from 'office-ui-fabric-react';
import { AppContext } from '../AppContext';

const spacing = {
	childrenGap: 10
}

export class AppHeader extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			showPanel: {
				panel: false,
				chan: false
			}
		}
	}

	_isMounted = false;

	// affiche/cache le panel qui permet de changer son Username et son image de profil
	private _showPanel = (id: string) => (): void => {

		const { showPanel } = this.state;
		showPanel[id] = true;

		if (this._isMounted)
		{
			this.setState({ showPanel: showPanel });
		}
	};

	private _hidePanel = (id: string) => (): void => {

		const { showPanel } = this.state;
		showPanel[id] = false;

		if (this._isMounted)
		{
			this.setState({ showPanel: showPanel });
		}
	};

	private _logout = () => (): void => {
		this.props.logout();
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const style = {
			root: {
				fontSize: '10px',
				color: '#aaa',
				padding: 0
			}
		}

		const imageProps: IImageProps = {
			imageFit: ImageFit.contain,
			width: 200,
			height: 200
		};

		return (
			<div>
				<Stack horizontalAlign="center" padding={10} tokens={spacing}>
					<Text variant="xLarge">
						Chat With React (Connected: {this.context.count})
					</Text>
					<Stack horizontalAlign="center" horizontal tokens={spacing}>
						<DefaultButton text="Channel List" onClick={this._showPanel('chan')} />
						<DefaultButton text="Profil Settings" onClick={this._showPanel('panel')} />
						<DefaultButton text="Logout" onClick={this._logout()} />
					</Stack>
				</Stack>
				<Panel isOpen={this.state.showPanel.panel} isLightDismiss={true} headerText="Profil Settings" onDismiss={this._hidePanel('panel')}>
					<Image
						{...imageProps as any}
						// Image par defaut si la variable pour l image est vide
						src={this.context.pdp ? this.context.pdp : 'https://www.freeiconspng.com/uploads/discord-metro-style-icon-0.png'}
						alt="Profil Photo"
					/>
					<Label styles={style} htmlFor="idName">Name</Label>
					<TextField className="textInput" id="idName" multiline={false} resizable={false} placeholder="Anonyme" value={this.context.author} onChange={this.context.changeName}/>
					<Label styles={style} htmlFor="idProfil">Image</Label>
					<TextField className="textInput" id="idProfil" multiline={false} resizable={false} placeholder="Image Url" value={this.context.pdp} onChange={this.context.changeUrl}/>
				</Panel>
				<Panel isOpen={this.state.showPanel.chan} isLightDismiss={true} headerText="Channel" onDismiss={this._hidePanel('chan')}>
					<Stack horizontalAlign="center" padding={10} tokens={spacing}>
						<Link className="channelBlock" href="/salon/1">Salon 1</Link>
						<Link className="channelBlock" href="/salon/2">Salon 2</Link>
						<Link className="channelBlock" href="/salon/3">Salon 3</Link>
						<Link className="channelBlock" href="/salon/4">Salon 4</Link>
						<Link className="channelBlock" href="/salon/5">Salon 5</Link>
					</Stack>
				</Panel>
			</div>
		);
	}
};

AppHeader.contextType = AppContext;