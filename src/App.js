import './App.css';
import JoinRoom from './JoinRoom'
import Room from './Room';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './styles.css'
import { useHMSStore, selectIsConnectedToRoom } from '@100mslive/react-sdk';
import "./components/Cart"
import Cart from './components/Cart';
import { Feed } from '@mui/icons-material';

function App() {
  
  const isConnected = useHMSStore(selectIsConnectedToRoom)

  return (
    <>
<Router>
   

      <Routes>        
        <Route exact path="/cart" component={Cart}/>  
        <Route path="/feed" component={Feed}/>     
      </Routes>  
      <div className="App wrapper"> 
    {isConnected
      ? <Room />
      : <JoinRoom />
    }
  </div>
    </Router>

    </>
    
  );
}

export default App;
