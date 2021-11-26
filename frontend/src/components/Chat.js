import React, { useEffect, useState, useContext } from "react";
import SendIcon from "@material-ui/icons/Send";
import { nanoid } from "nanoid";
import "./chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MicIcon from "@material-ui/icons/Mic";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { StateContext } from "../context/StateProvider";

const socket = new WebSocket("ws://localhost:5000/ws");

const Chat = () => {
  const { currentRoom, user } = useContext(StateContext);

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    joinRoom()
    return () => {
      setChats([])
      leavRoom()
    }
  }, [currentRoom])

  useEffect(() => {
    var scrollDiv = document.getElementById("chats");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
    socket.onopen = () => {
      console.log("connecting...");
      console.log("connected");
    };

    socket.onclose = (event) => {
      console.log("Closed Connection");
    };

    socket.onmessage = (msg) => {
      console.log(JSON.parse(msg.data));
      setChats([...chats, JSON.parse(msg.data)]);
    };

    socket.onerror = (err) => {
      console.log("Error: ", err);
    };
  });

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.length !== 0) {
      console.log(message);
      await socket.send(
        JSON.stringify({
          body: message,
          user_id: user._id,
          user_name: user.name,
          type: "message",
          room: currentRoom.name,
          token: window.localStorage["token"]
        })
      );
      await setMessage("");
    } else {
      console.log("object");
    }
  };

  const joinRoom = () => {
    socket.send(
      JSON.stringify({
        body: currentRoom.name,
        user_id: user._id,
        user_name: user.name,
        type: "joinRoom",
        room: currentRoom.name,
        token: window.localStorage["token"]
      })
    );
  };

  const leavRoom = () => {
    socket.send(
      JSON.stringify({
        body: currentRoom.name,
        user_id: user._id,
        user_name: user.name,
        type: "leaveRoom",
        room: currentRoom.name,
        token: window.localStorage["token"]
      })
    );
  };

  let d = new Date()
  let hours = d.getHours()
  let minutes = d.getMinutes()
  return (
    <div className="chat">
      {currentRoom &&<header className="chatHeader">
        <Avatar src={currentRoom.group_icon}/>
        <div className="chatHeaderData">
          <h3>{currentRoom.name}</h3>
          <p>last seen at ...</p>
        </div>
        <div className="chatHeaderRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </header>}
      <div id="chats" className="chatBody">
        {chats.map((data, i) =>
          data.type === "message" ? (
            <div
              key={i}
              className={`chatMessage ${
                data.user_id === user._id && "chatSender"
              }`}
            >
              <p >{data.user_name}</p>
              <p className="dataMessage">{data.body}</p>
              <div className="chatTimeStamp">{hours+":"+minutes}</div>
            </div>
          ) : (
            <p key={i} className={`chatJoinOrLeft`}>
              {data.type === "joinRoom"
                ? `${
                    data.user_id === user._id
                      ? "you joined"
                      : `${data.user_name} joined`
                  }`
                : `${
                    data.user_id === user._id ? "you left" : `${data.user_name} left`
                  }`}
            </p>
          )
        )}
      </div>
      <footer className="chatFooter">
        <EmojiEmotionsOutlinedIcon />
        <AttachFileIcon />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            send a message
          </button>
        </form>
        {message.length !== 0 ? (
          <IconButton onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        ) : (
          <IconButton>
            <MicIcon />
          </IconButton>
        )}
      </footer>
    </div>
  );
};

export default Chat;
