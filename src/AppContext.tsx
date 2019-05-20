import React from 'react'
import { MessagesList } from './App.types';

interface AppContextInterface {
	author: string;
    list: MessagesList | null;
    count: number;
    id: string;
    sendMessage: (author: string, text: string, id: string) => void;
    changeName: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string | undefined) => void;
}

export const AppContext = React.createContext<AppContextInterface | undefined>(undefined);
