import { useState } from 'react'
import {projectFirestore} from '../firebase/config'

export const useSetCard = () => {
    const [cardLogged, setCardLogged] = useState("unset")

    const logCard = async (name, card) => {
        setCardLogged("waiting")

        try {
            const res = await projectFirestore.collection('cards').doc(name).set({card: card})
            
            setCardLogged("logged")
        } catch (err) {
            console.log(err.message)
            setCardLogged("err")
        }

    }
    return {cardLogged, logCard}


}