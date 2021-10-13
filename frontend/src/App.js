import React from "react";
import "./App.css";
import Routes from "./Routes"
import { StateProvider } from "./context/StateProvider";
import Alert from "./components/Alert";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <StateProvider>
          <Routes/>
          <Alert/>
        </StateProvider>
      </div>
    </div>
  );
}
export default App;
