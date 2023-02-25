import {useEffect, useState} from 'react'
import {projectFirestore} from '../firebase/config'
// hook for fetching the firebase doc
// id is the person's name
export const useDoc = (id) => {
  const [card, setCard] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    // reference to doc in database. Fine even if doc doesn't exist.
    const ref = projectFirestore.collection('cards').doc(id)

    // get realtime updates to document. we will get an
    // error for non existent doc, but handle it. subscription should remain.
    const unSub = ref.onSnapshot((snapshot) => {
      setCard(snapshot.data())
      setError(null)
    }, (err) => {
      console.log(err.message)
      setError("Nothing here!")
    })
    // unsubscribe from doc updates so we don't
    // get a bunch of subscriptions from re-renders
    return () => unSub()
  }, [id])

  return { card, error }
}
