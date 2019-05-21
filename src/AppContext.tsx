import React from 'react'
import { MessagesList } from './App.types';

interface AppContextInterface {
	author: string;
    list: MessagesList | null;
    count: number;
    id: string;
    pdp: string | null;
    sendMessage: (author: string, text: string, id: string, pdp: string | null) => void;
    changeName: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => void;
    changeUrl: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => void;
}

export const AppContext = React.createContext<AppContextInterface | undefined>(undefined);
