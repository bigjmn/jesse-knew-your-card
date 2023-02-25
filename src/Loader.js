import { useLocation } from 'react-router-dom'
import ShownCard from './pages/ShownCard'
import SetCard from './pages/SetCard'
import CardRecord from './pages/CardRecord'

const Loader = () => {
  const location = useLocation()
  if (location.pathname === "/cardset"){
    return (
      <CardRecord />
    )
  }

  const pathParts = location.pathname.split("/")
    .filter(part => part !== '')

  if (!pathParts) return <p>No parts!</p>
  if (pathParts.length == 1) return (
    <ShownCard name={pathParts[0]} />
  )
  if (pathParts.length == 2) return (
    <SetCard name={pathParts[0]} newcard={pathParts[1]} />
  )
  return <p>wrong num of parts!</p>

}

export default Loader
