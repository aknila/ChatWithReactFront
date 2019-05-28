import React from 'react';
import { Stack, Image, IImageProps, ImageFit } from 'office-ui-fabric-react';
import { AppMessageItem } from './AppMessageItem';
import { AppContext } from '../AppContext';

const spacing = {
	childrenGap: 10
}

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
		const imageProps: IImageProps = {
			imageFit: ImageFit.contain,
			width: 50,
			height: 50,
			className: 'pdpImage'
		};

		return (
			<Stack className="container" tokens={spacing}>
				{listId.map(id => {
					return (
						<Stack key={id} horizontal tokens={{childrenGap: 5}} className="subContainer">
							<Image
								{...imageProps}
								src={ list[id].pdp ? list[id].pdp : 'https://www.freeiconspng.com/uploads/discord-metro-style-icon-0.png' }
								alt="Profil Photo"
							/>
							<AppMessageItem id={id} {...list[id]}/>
						</Stack>
					);
				})}
				<div style={{ float:"left", clear: "both" }}
             		ref={this.myRef}>
    			</div>
			</Stack>
		)
	}

	// Permet de descendre tout en bas de la liste de message quand un nouveau message arrive
	scrollToBottom = () => {
		if (this.myRef && this.myRef.current && this._isMounted) {
			this.myRef.current.scrollIntoView({ behavior: "smooth"});
		}
	}
	
	componentDidMount() {
		this._isMounted = true;
		this.scrollToBottom();
	}

	// Scroll uniquement si il y a un nouveau message
	componentDidUpdate() {
		if (this.props.lastEvent === 'new' && this._isMounted) {
			this.scrollToBottom();
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}
}

AppMessageList.contextType = AppContext;