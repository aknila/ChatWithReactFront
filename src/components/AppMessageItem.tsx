import React from 'react';
import { Label, Stack, Text } from 'office-ui-fabric-react';
import { AppContext } from '../AppContext';

export class AppMessageItem extends React.Component<any, any> {

	render() {
		const { author, text, id, aid } = this.props;
		const style = {
			root: {
				fontSize: '10px',
				color: '#ffffff',
				padding: 0
			}
		}
		return (
			<Stack className={aid === this.context.id ? "containerItemAuthor" : "containerItem"} padding={5}>
				<Label styles={style} htmlFor={id}>{author}#{aid.substring(0, 4)}</Label>
				<Text id={id}>{text}</Text>
			</Stack>
		)
	}
}

AppMessageItem.contextType = AppContext;