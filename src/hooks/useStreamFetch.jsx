import { useState, useEffect } from 'react'
import { useSetCard } from './useSetCard'
export const useStreamFetch = () => {
    const [text, setText] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const { cardLogged, logCard } = useSetCard()

    const getText = async (audioData) => {
        setError(null)
        setIsPending(true)

        try {
            const response = await fetch("https://api.assemblyai.com/v2/stream", {
                method: "POST",
                headers: {
                    "authorization": process.env.REACT_APP_AUDIOKEY,
                    "content-type": "application/json",
                    "transfer-encoding": "chunked"

                },
                body: JSON.stringify({"audio_data": audioData})
            })
            if (!response) {
                throw new Error("could not get it!")
            }
            const resObject = await response.json()
            console.log(resObject)
            const cardName = resObject.words[0].text
            const cardCard = resObject.words.slice(-3).map(w => w.text).join(' ')
            console.log(cardName, cardCard)
            logCard(cardName, cardCard)
            setText(resObject.text)
            setIsPending(false)
        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }
    return { cardLogged, text, isPending, error, getText }

}