import React from 'react';
import { Stack } from 'office-ui-fabric-react';
import { AppMessageItem } from './AppMessageItem';
import { AppContext } from '../AppContext';

const spacing = {
	childrenGap: 10
}

// let messagesEnd: HTMLDivElement | null;

export class AppMessageList extends React.Component<any, any> {

	_isMounted = false;
	myRef: React.RefObject<HTMLDivElement> | null;

	constructor(props: any) {
		super(props);
		this.myRef = React.createRef();
	}

	render() {
		const { list } = this.context;

		const listId = Object.keys(list);
		return (
			<Stack padding={10} className="container" tokens={spacing}>
				{listId.map(id => (
					<AppMessageItem key={id} id={id} {...list[id]}/>
				))}
				<div style={{ float:"left", clear: "both" }}
             		ref={this.myRef}>
        		</div>
			</Stack>
		)
	}

	scrollToBottom = () => {
		if (this.myRef && this.myRef.current && this._isMounted) {
			this.myRef.current.scrollIntoView({ behavior: "smooth"});
		}
	}
	
	componentDidMount() {
		this._isMounted = true;
		this.scrollToBottom();
	}
	
	componentDidUpdate() {
		this.scrollToBottom();
	}

	componentWillUnmount() {
		this._isMounted = false;
	}
}

AppMessageList.contextType = AppContext;