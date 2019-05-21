import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppMessageItem } from './AppMessageItem';
import { AppContext } from '../AppContext';
// import toJson from 'enzyme-to-json';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

Enzyme.configure({ adapter: new Adapter() });

class AppTest extends React.Component<any, any> {
	render() {
		const { author, text, id, aid } = this.props;
		return (
			<AppContext.Provider value={{
				author: 'name',
				list: null,
				count: 0,
				id: 'authorID',
				pdp: '',
				sendMessage: (author: string, text: string, id: string) => {},
				changeName: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => {},
				changeUrl: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => {}
			}}>
				<AppMessageItem author={author} text={text} id={id} aid={aid}/>
			</AppContext.Provider>
		)
	}
}

it('render AppMessageItem', () => {
	const wrapper = Enzyme.mount(<AppTest author='name' text='oui' id='longstring' aid='authorID'/>);
	expect(wrapper.find('Stack#messageItem').hasClass('containerItemAuthor')).toBe(true);
	wrapper.setProps({ aid: 'bar' });
	expect(wrapper.find('Stack#messageItem').hasClass('containerItemAuthor')).toBe(false);
})