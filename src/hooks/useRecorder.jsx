import { RecordRTCPromisesHandler, StereoAudioRecorder } from "recordrtc";
import { useState, useEffect, useRef} from 'react'

export const useRecorder = () => {
    const recorder = useRef(null)
    const [audioBurst, setAudioBurst] = useState(null)

    useEffect(() => {
        if (audioBurst) {
            const res = fetch("https://api.assemblyai.com/v2/transcript", {
                method: "POST",
                headers: {
                    "authorization": process.env.REACT_APP_AUDIOKEY,
                    "content-type": "application/json",
                    "transfer-encoding": "chunked"

                },
                body: JSON.stringify({audiodata: audioBurst.split('base64,')[1]})
            })
            const resob = res.json()
            console.log(resob)
        }
    }, [audioBurst])

    useEffect(() => {
        (async () => {
            navigator.mediaDevices.getUserMedia({audio: true})
            .then((stream) => {
                recorder.current = new RecordRTCPromisesHandler(stream, {
                    type: 'audio',
                    mimeType: 'audio/webm;codecs=pcm',
                    recorderType: StereoAudioRecorder,
                    timeSlice: 5000,
                    desiredSampRate: 16000,
                    numberOfAudioChannels: 1,
                    bufferSize: 4096,
                    audioBitsPerSecond: 128000,
                    ondataavailable: (blob) => {
                        const reader = new FileReader()
                        reader.onload = () => {
                            const base64data = reader.results
                            console.log(base64data)
                            setAudioBurst(base64data) 

                        }
                        reader.readAsDataURL(blob)
                    }
                })
                
            })
        })()
    }, [recorder])

    // const start = () => {
    //     if (recorder.current){
    //         recorder.startRecording()

    //     }
    // }
    // const stop = () => {
    //     if (recorder.current){
    //         recorder.pauseRecording()
    //     }
    // }

    return { recorder }

}