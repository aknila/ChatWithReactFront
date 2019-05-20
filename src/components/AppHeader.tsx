import React from 'react';
import { Stack, Text, TextField, Label } from 'office-ui-fabric-react';
import { AppContext } from '../AppContext';

const spacing = {
	childrenGap: 10
}

export class AppHeader extends React.Component<any, any> {

	render() {
		const style = {
			root: {
				fontSize: '10px',
				color: '#aaa',
				padding: 0
			}
		}

		return (
			<Stack horizontalAlign="center" padding={10} tokens={spacing}>
				<Text variant="xLarge">
					Chat With React (Connected: {this.context.count})
				</Text>
				<Label styles={style} htmlFor="inputName">Username</Label>
				<TextField id="inputName" multiline={false} resizable={false} placeholder='Anonyme' value={this.context.author} onChange={this.context.changeName}/>
			</Stack>
		);
	}
};

AppHeader.contextType = AppContext;
