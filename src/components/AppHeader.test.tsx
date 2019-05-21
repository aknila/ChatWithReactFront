import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppHeader } from './AppHeader';
import { AppContext } from '../AppContext';
// import toJson from 'enzyme-to-json';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

Enzyme.configure({ adapter: new Adapter() });

class AppTest extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			author: this.props.author
		}
	}

	render() {
		const { fn } = this.props;
		const { author } = this.state;

		const fakeOnChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => {
			if (newValue) {
				this.setState({
					author: newValue
				});
			}
			fn();
		};

		return (
			<AppContext.Provider value={{
				author: author,
				list: null,
				count: 0,
				id: 'authorID',
				pdp: '',
				sendMessage: (author: string, text: string, id: string) => {},
				changeName: fakeOnChange,
				changeUrl: fakeOnChange
			}}>
				<AppHeader />
			</AppContext.Provider>
		)
	}
}

it('render AppHeader', () => {
	let authorName = 'name';
	const mockOnChange = jest.fn();
	const event = {
		preventDefault() {},
		target: { value: 'the-value' }
	};
	const wrapper = Enzyme.mount(<AppTest author={authorName} fn={mockOnChange}/>);

	expect(wrapper.find('input')).toHaveLength(0);
	wrapper.find('DefaultButton').simulate('click');
	expect(wrapper.find('input')).toHaveLength(2);
	wrapper.find('input#idName').simulate('change', event);
	wrapper.find('input#idProfil').simulate('change', event);
	wrapper.update();
	expect(mockOnChange.mock.calls.length).toBe(2);
})