import React,{useContext} from "react";
import "./App.css";
import SideBar from "./components/SideBar"
import Chat from "./components/Chat";
import Login from "./components/Login";
import { StateContext } from "./context/StateProvider"

function App() {
  const { state } = useContext(StateContext)
console.log(state)
  return (
    <div className="App">
      <div className="app-container">
        <Login/>
        {state.user && <SideBar />}
        {state.user && <Chat/>}
      </div>
    </div>
  );
}
export default App;
