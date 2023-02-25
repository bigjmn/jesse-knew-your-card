import {useState, useEffect} from 'react'
import {cardDict} from '../static/cardDict'
import {projectFirestore} from '../firebase/config'
const SetCard = ({name, newcard}) => {
  const [message, setMessage] = useState("Loading")

  useEffect(() => {
    console.log(name)
    console.log(newcard)
    if (cardDict[newcard]) {
      const ref = projectFirestore.collection('cards').doc(name)
      try {
        ref.set({card: cardDict[newcard]})
        setMessage("success")
      } catch (e) {
        console.log(e.message)
        setMessage(e.message)
      }
    }
  }, [])
  return(
    <div>
      <p>{name}</p>
      <p>{newcard}</p>
    </div>

  )
}
export default SetCard
