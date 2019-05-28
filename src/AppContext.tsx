import React from 'react'
import { Message } from './App.types';

interface AppContextInterface {
	author: string;
    list: Message[] | null;
    count: number;
    id: string;
    pdp: string | null;
    endpoint: string;
    sendMessage: (author: string, text: string, aid: string, pdp: string | null, type: string, link: string | null) => void;
    changeName: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => void;
    changeUrl: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => void;
    editMessage: (uid: string, text: string) => void;
    deleteMessage: (uid: string) => void;
}

export const AppContext = React.createContext<AppContextInterface | undefined>(undefined);
