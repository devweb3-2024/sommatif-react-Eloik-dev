import styles from './Tableau.module.scss'
import { Grid } from "@mui/material";
import useChats from "../../hooks/useChats";
import { createContext, ReactElement, useEffect, useState } from 'react';

export const nombreTableau: number = 8;
const coupsRestantMax: number = 20;

type TypePaire = {
    premiereSelection: number,
    deuxiemeSelection: number,
}

interface ITableauContexte {
    handleSelection: (index: number) => void;
    paire: TypePaire;
}

const selectionInitiale: TypePaire = {
    premiereSelection: -1,
    deuxiemeSelection: -1,
}

export const tableauContexte = createContext<ITableauContexte>({
    handleSelection: () => { },
    paire: selectionInitiale
});

export default function Tableau() {
    const [chats] = useChats();
    const [coupsRestant, setCoupsRestant] = useState(coupsRestantMax);
    const [paire, setPaire] = useState<TypePaire>(selectionInitiale)

    /**
     * À la sélection d'une image, valider la paire 
     */
    useEffect(() => {
        reduireCoupsRestant();

        if (paire.deuxiemeSelection !== -1) {
            setPaire(selectionInitiale);
        }
    }, [paire])


    /**
     * Redémarrer le jeu s'il n'y a plus aucun coups restant
     */
    useEffect(() => {
        if (coupsRestant <= 0) {
            redemarrer();
        }
    }, [coupsRestant])

    /**
     * Fait la sélection des paires
     * @param index L'index de l'image sélectionnée
     */
    const handleSelection = (index: number) => {
        if (paire.premiereSelection === -1) {
            setPaire({ ...paire, premiereSelection: index });
            return;
        }

        if (paire.deuxiemeSelection === -1) {
            setPaire({ ...paire, deuxiemeSelection: index });
            return
        }
    }

    /**
     * Réduire les coups restants de 1 si au moins deux cartes ont été sélectionnées 
     */
    const reduireCoupsRestant = () => {
        if (paire.premiereSelection === -1 || paire.deuxiemeSelection === -1) {
            return;
        }

        setCoupsRestant(prev => --prev);
    }

    /**
     * Redémarre le jeu
     */
    const redemarrer = () => {
        window.location.reload();
    }

    return (
        <tableauContexte.Provider value={{ handleSelection, paire }}>
            <main className={styles['tableau-container']}>
                <h3>
                    Nombre de coups restant: {coupsRestant}
                </h3>
                <button id={styles['relanceJeuBouton']} onClick={redemarrer}>
                    Relancer le jeu
                </button>
                <Grid container columns={{ xs: 4 }} spacing={2}>
                    {(chats as ReactElement[]).map((chatBouton, index) => {
                        return (
                            <Grid item xs={1} width={70} key={index}>
                                {chatBouton}
                            </Grid>
                        )
                    })}
                </Grid>
            </main>
        </tableauContexte.Provider>
    )
}