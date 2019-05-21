import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppFooter } from './AppFooter';
import { AppContext } from '../AppContext';
import toJson from 'enzyme-to-json';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

Enzyme.configure({ adapter: new Adapter() });

class AppTest extends React.Component<any, any> {

	render() {
		const { fn } = this.props;

		const fakeSendMessage = (author: string, text: string, id: string) => {
			fn(text);
		};

		return (
			<AppContext.Provider value={{
				author: '',
				list: null,
				count: 0,
				id: 'authorID',
				pdp: '',
				sendMessage: fakeSendMessage,
				changeName: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => {},
				changeUrl: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => {}
			}}>
				<AppFooter />
			</AppContext.Provider>
		)
	}
}

it('render AppHeader', () => {
	const mockSendMessage = jest.fn(txt => txt);
	const event = {
		preventDefault() {},
		target: { value: 'the-value' }
	};
	const wrapper = Enzyme.mount(<AppTest fn={mockSendMessage}/>);

    // console.log(toJson(wrapper.find('#sendButton')));

	expect(wrapper.find('input#sendInput').prop('value')).toBe('');
    wrapper.find('input#sendInput').simulate('change', event);
    expect(wrapper.find('input#sendInput').prop('value')).toBe('the-value');
    wrapper.find('CustomizedPrimaryButton#sendButton').simulate('click');
    expect(wrapper.find('input#sendInput').prop('value')).toBe('');
	expect(mockSendMessage.mock.calls.length).toBe(1);
})