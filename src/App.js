import "./App.css";
import JoinRoom from "./JoinRoom";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./styles.css";
import { useHMSStore, selectIsConnectedToRoom } from "@100mslive/react-sdk";

function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<JoinRoom />} />
          <Route
            exact
            path="live"
            element={isConnected ? <Room /> : <Navigate replace to={"/"} />}
          />
        </Routes>
        <div className="App wrapper"></div>
      </Router>
    </>
  );
}

export default App;
