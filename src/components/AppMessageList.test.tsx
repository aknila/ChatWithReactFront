import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppMessageList } from './AppMessageList';
import { AppContext } from '../AppContext';

Enzyme.configure({ adapter: new Adapter() });

class AppTest extends React.Component<any, any> {
	render() {
        const { list } = this.props;
		return (
			<AppContext.Provider value={{
				author: 'name',
				list: list,
				count: 0,
				id: 'authorID',
				pdp: '',
				sendMessage: (author: string, text: string, id: string) => {},
				changeName: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => {},
				changeUrl: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => {}
			}}>
				<AppMessageList />
			</AppContext.Provider>
		)
	}
}

it('render AppMessageList', () => {
    window.HTMLElement.prototype.scrollIntoView = () => {};
    const list = {
        '1': {
            author: 'Anthony',
            text: 'Hey',
            aid: 'nope'
        }
    }
    const list2 = {
        '2': {
            author: 'Jack',
            text: 'Bonsoir',
            aid: 'nope'
        }
    }
	const wrapper = Enzyme.mount(<AppTest list={list}/>);
	expect(wrapper.children().find('AppMessageItem')).toHaveLength(1);
	wrapper.setProps({ list: {...list, ...list2} });
	expect(wrapper.children().find('AppMessageItem')).toHaveLength(2);
})