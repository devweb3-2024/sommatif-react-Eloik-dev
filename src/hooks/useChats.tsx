import { ReactElement, useEffect, useState } from "react";
import Chat1 from '../../public/chat1.png'
import Chat2 from '../../public/chat2.png'
import Chat3 from '../../public/chat3.png'
import Chat4 from '../../public/chat4.png'
import Chat5 from '../../public/chat5.png'
import Chat6 from '../../public/chat6.png'
import Chat7 from '../../public/chat7.png'
import Chat8 from '../../public/chat8.png'
import { nombreTableau } from "../containers/Tableau/Tableau"
import Chat from "../composantes/Chat"
import _ from 'lodash'

type MappingChat = {
    image: string,
    index: number
}

const mappingsChats: MappingChat[] = [
    {
        image: Chat1,
        index: 1
    },
    {
        image: Chat2,
        index: 2
    },
    {
        image: Chat3,
        index: 3
    },
    {
        image: Chat4,
        index: 4
    },
    {
        image: Chat5,
        index: 5
    },
    {
        image: Chat6,
        index: 6
    },
    {
        image: Chat7,
        index: 7
    },
    {
        image: Chat8,
        index: 8
    }
]

export default function useChats() {
    const [chats, setChats] = useState<ReactElement[]>([]);

    /**
     * Initialiser les chats par défaut
     */
    useEffect(() => {
        if (chats.length >= nombreTableau) {
            return;
        }

        initialiserChats();
    }, [])

    /**
     * Fait une initialisation aléatoire des chats
     */
    const initialiserChats = () => {
        const chatsAleatoire = _.shuffle(mappingsChats);

        for (let i = 0; i < chatsAleatoire.length; i++) {
            const chat = chatsAleatoire[i];
            
            setChats(prev => [...prev, 
                <Chat index={chat.index}>
                    <img src={chat.image}  width={200} alt="Image de chat" />
                </Chat>
            ]);
        }
    }

    return [chats, initialiserChats];
}