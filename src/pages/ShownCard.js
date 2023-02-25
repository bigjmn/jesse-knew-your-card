import {useDoc} from '../hooks/useDoc'
const ShownCard = ({name}) => {
  const { card, error } = useDoc(name)
  return(
    <div>
      {card && <h1 style={{textAlign:"center"}}>{card.card}</h1>}
    </div>

  )
}
export default ShownCard
