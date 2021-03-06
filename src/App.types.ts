export interface Message {
	author: string;
	text: string;
	aid: string;
	pdp: string | null;
	date: string | null;
	uid: string;
	type: string;
	link: string | null;
}
  
export interface MessagesList {
	[id: string]: Message;
}
