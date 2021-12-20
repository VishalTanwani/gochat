import React, { useContext, useState } from "react";
import "./conversation.css";
import { Avatar } from "@material-ui/core";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { StateContext } from "../context/StateProvider";
import { socketFunctions } from "./socket";
import axios from "axios";
import aes256 from "aes256"

function Conversation(props) {
  const { data, type, setSearch, search } = props;
  const { selectRoom, currentRoom, joinGroup, user, sendMessage, displayError } = useContext(StateContext);
  const [lastMessage, setLastMessage] = useState(null)

  const handleClick = async () => {
    if (!data.users || !data.users.includes(user.email)) {
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
      await setSearch("")
    }
    await selectRoom(data._id);
  };

  const handleCreate = async () => {
    axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/room/create", {
          "Content-Type": "application/json",
          token: window.localStorage["token"],
          name: search,
          type: "public",
        })
        .then(async function (response) {
          console.log(response)
          await socketFunctions.sendMessage({
            body: user && user.name + "<check> create group",
            user_id: user && user._id,
            user_name: user && user.name,
            type: "createRoom",
            room: response && response.data.name,
            room_id: response && response.data._id,
            token: window.localStorage["token"],
          });
          await sendMessage({
            body: user && user.name + "<check> create group",
            user_id: user && user._id,
            user_name: user && user.name,
            type: "createRoom",
            room: response && response.data.name,
            room_id: response && response.data._id,
            token: window.localStorage["token"],
          })
          await selectRoom(response.data._id)
        })
        .catch(function (error) {
          console.log(error);
          displayError(error)
        });
    await setSearch("")
  }

  const handleLastMessage = () => {
    axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/message/getLastMessage", {
          "Content-Type": "application/json",
          token: window.localStorage["token"],
          room_id: data._id,
        })
        .then(async function (response) {
          setLastMessage(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  if(type==="create") {
    return(
      <div
        className="conversation"
        onClick={handleCreate}
      >
        <div>
          <Avatar
          />
          <div className="roomInfo">
            <h1>{search}</h1>
          </div>
        </div>
        <p className="conversation-join">create</p>
      </div>
    )
  } else {
    return (
      <div
        className={`conversation ${
          (currentRoom && currentRoom._id === data._id) && "active-background"
        }`}
        onClick={handleClick}
        onLoad={handleLastMessage}
      >
        <div>
          <Avatar
            src={data.group_icon}
          />
          <div className="roomInfo">
            <h1>{data.name}</h1>
            <p style={{display:(lastMessage && lastMessage.image)?"flex":"block"}}>{lastMessage && (lastMessage.image 
              ? <><PhotoCameraIcon/> Photo</> 
              : lastMessage.body!=="" && aes256.decrypt(data._id,lastMessage.body).includes("<check>") 
                ? lastMessage.user_id === user._id 
                  ? "You "+aes256.decrypt(data._id,lastMessage.body).split("<check>")[1]
                  : aes256.decrypt(data._id,lastMessage.body).split("<check>")[0]+aes256.decrypt(data._id,lastMessage.body).split("<check>")[1] 
                : aes256.decrypt(data._id,lastMessage.body))}
            </p>
          </div>
        </div>
        {type === "search" && (!data.users || !data.users.includes(user.email)) && <p className="conversation-join">Join</p>}
      </div>
    );
  }

  
}

export default Conversation;
