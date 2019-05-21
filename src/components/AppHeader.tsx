import React from 'react';
import { Stack, Text, TextField, Label, Panel, DefaultButton, Image, IImageProps, ImageFit } from 'office-ui-fabric-react';
import { AppContext } from '../AppContext';

const spacing = {
	childrenGap: 10
}

export class AppHeader extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			showPanel: false
		}
	}

	_isMounted = false;

  // affiche/cache le panel qui permet de changer son Username et son image de profil
	private _showPanel = (): void => {
		if (this._isMounted)
		{
			this.setState({ showPanel: true });
		}
	};
	
	private _hidePanel = (): void => {
		if (this._isMounted)
		{	
			this.setState({ showPanel: false });
		}
	};

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
				  <DefaultButton text="Profil Settings" onClick={this._showPanel} />
			  </Stack>
        <Panel isOpen={this.state.showPanel} isLightDismiss={true} headerText="Profil Settings" onDismiss={this._hidePanel}>
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
      </div>
		);
	}
};

AppHeader.contextType = AppContext;