import React from "react";
import "./App.css";
import Routes from "./Routes";
import { StateProvider } from "./context/StateProvider";
import Alert from "./components/Alert";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <StateProvider>
          <Profile />
          <Routes />
          <Alert />
        </StateProvider>
      </div>
    </div>
  );
}
export default App;
