import React, { useContext } from "react";
import "./conversation.css";
import { Avatar } from "@material-ui/core";
import { StateContext } from "../context/StateProvider";

function Conversation(props) {
  const { data } = props;
  const { selectRoom, currentRoom } = useContext(StateContext);

  const handleClick = () => {
    selectRoom(data._id);
  };

  return (
    <div
      className={`conversation ${
        (currentRoom && currentRoom._id === data._id) && "active-background"
      }`}
      onClick={handleClick}
    >
      <Avatar
        src={data.group_icon}
      />
      <div className="roomInfo">
        <h1>{data.name}</h1>
        <p>last message ....</p>
      </div>
    </div>
  );
}

export default Conversation;
