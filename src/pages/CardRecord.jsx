import { useStreamFetch } from "../hooks/useStreamFetch"
import { useRecorder } from "../hooks/useRecorder"
import { useState } from 'react'
const CardRecord = () => {
    const { recorder } = useRecorder()
    const {cardLogged, text, isPending, error, getText } = useStreamFetch()

    
    const [isRecording, setIsRecording] = useState(false)

    const toggleRecord = () => {
        isRecording ? stop() : start()
    }

    const start = () => {
        recorder.current.startRecording()
        setIsRecording(true)
    }
    const stop = async () => {
        setIsRecording(false)
        const stopres = await recorder.current.stopRecording()
        const res = await recorder.current.getDataURL()
        console.log(res)
        const rawData = res.split('base64,')[1]
        if (!rawData) {
            console.log('nooo!')
            return
        }
        getText(rawData)
    }


    
    return(
        <div style={{height:"900px"}}>
            <button style={{backgroundColor: cardLogged === "logged" ? "green" : cardLogged === "err" ? "red" : isRecording ? "blue" : "orange", height: "100%", width: "100%"}} onClick={toggleRecord}>{text}</button>
            
            
            {isPending && <p>waiting...</p>}
            {error && <p>{error}</p>}
            
        </div>
    )
}

export default CardRecord 