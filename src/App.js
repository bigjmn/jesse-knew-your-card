import Loader from './Loader'
import {BrowserRouter} from 'react-router-dom'
import './App.css'
function App() {
  return (
    <BrowserRouter className="App">
      <Loader className="App"/>

    </BrowserRouter>
  );
}

export default App;
