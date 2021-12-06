import React, { useContext } from "react";
import "./conversation.css";
import { Avatar } from "@material-ui/core";
import { StateContext } from "../context/StateProvider";
import { socketFunctions } from "./socket";

function Conversation(props) {
  const { data, type, setSearch } = props;
  const { selectRoom, currentRoom, joinGroup, user, sendMessage } = useContext(StateContext);

  const handleClick = async () => {
    if (!data.users.includes(user.email)) {
      await socketFunctions.sendMessage({
        body: user && user.name + "<check> joined",
        user_id: user && user._id,
        user_name: user && user.name,
        type: "joinRoom",
        room: data && data.name,
        room_id: data && data._id,
        token: window.localStorage["token"],
      });
      await sendMessage({
        body: user && user.name + "<check> joined",
        user_id: user && user._id,
        user_name: user && user.name,
        type: "joinRoom",
        room: data && data.name,
        room_id: data && data._id,
        token: window.localStorage["token"],
      })
      type === "search" && await joinGroup(data._id)
    }
    await selectRoom(data._id);
    await setSearch("")
  };

  return (
    <div
      className={`conversation ${
        (currentRoom && currentRoom._id === data._id) && "active-background"
      }`}
      onClick={handleClick}
    >
      <div>
        <Avatar
          src={data.group_icon}
        />
        <div className="roomInfo">
          <h1>{data.name}</h1>
          <p>last message ....</p>
        </div>
      </div>
      {type === "search" && !data.users.includes(user.email) && <p className="conversation-join">Join</p>}
    </div>
  );
}

export default Conversation;
