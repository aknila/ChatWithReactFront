export interface Message {
	author: string;
	text: string;
	aid: string;
}
  
export interface MessagesList {
	[id: string]: Message;
}