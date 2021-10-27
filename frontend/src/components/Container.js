import React, { useEffect, useContext } from "react";
import SideBar from "./SideBar";
import Chat from "./Chat";
import SelectRoom from "./SelectRoom";
import { StateContext } from "../context/StateProvider";

function Container(props) {  
    const { currentRoom } = useContext(StateContext);
    useEffect(() => {
        if (window && !window.localStorage["token"]) {
            props.history.push("/login")
        }
    }, [props])
  return (
    <>
      <SideBar />
      {currentRoom ? <Chat /> : <SelectRoom/>}
    </>
  );
}

export default Container;
