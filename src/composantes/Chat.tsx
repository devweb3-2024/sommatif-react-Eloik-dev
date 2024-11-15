import { FC, ReactElement, useContext, useEffect, useState } from "react"
import DessusCarte from '../../public/dessus-carte.svg'
import { tableauContexte } from "../containers/Tableau/Tableau"

interface IChat {
    children: ReactElement;
    index: number;
}

const Chat: FC<IChat> = ({ children, index }) => {
    const { handleSelection, paire } = useContext(tableauContexte);
    const [retourne, setRetourne] = useState<Boolean>(false);
    const [enAttente, setEnAttente] = useState(false);

    /**
     * Retourner la carte après 1 secondes si le chat a été cliqué et que les paires ne sont pas valides
     */
    useEffect(() => {
        if (!enAttente) {
            return;
        }

        if (paire.deuxiemeSelection === -1) {
            return;
        }

        setEnAttente(false);
        setTimeout(() => {
            setRetourne(paire.premiereSelection === paire.deuxiemeSelection);
        }, 1000)
    }, [paire])

    /**
     * Au clique sur l'image, retourner la carte et notifier le tableau du changement
     */
    const handleClick = () => {
        if (retourne) {
            return;
        }

        setEnAttente(true);
        setTimeout(() => {
            setRetourne(true);
            handleSelection(index);
        }, 500)
    }

    return (
        <button className="chat-bouton" onClick={handleClick}>
            {retourne ?
                children
                :
                <img src={DessusCarte} width={200} alt="Dessus de la carte"></img>
            }
        </button>
    )
}

export default Chat;