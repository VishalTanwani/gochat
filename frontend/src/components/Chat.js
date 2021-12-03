import React, { useEffect, useState, useContext } from "react";
import SendIcon from "@material-ui/icons/Send";
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
  const { currentRoom, user, leftRoom, getMessages, messages, openGroupDesc, groupDescStatus } = useContext(
    StateContext
  );

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getMessages(currentRoom.name, currentRoom._id);
      await joinRoom();
    }
    fetchData();
    return () => {
      setChats([]);
    };
  }, [currentRoom]);

  useEffect(() => {
    setChats(messages);
  }, [messages]);

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
      setChats([...chats, JSON.parse(msg.data)]);
    };

    socket.onerror = (err) => {
      console.log("Error: ", err);
    };
  });

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.length !== 0) {
      await socket.send(
        JSON.stringify({
          body: message,
          user_id: user._id,
          user_name: user.name,
          type: "message",
          room: currentRoom.name,
          room_id: currentRoom._id,
          token: window.localStorage["token"],
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
        body: user.name + "<check> joined",
        user_id: user._id,
        user_name: user.name,
        type: "joinRoom",
        room: currentRoom.name,
        room_id: currentRoom._id,
        token: window.localStorage["token"],
      })
    );
  };

  const leavRoom = () => {
    socket.send(
      JSON.stringify({
        body: user.name + "<check> left",
        user_id: user._id,
        user_name: user.name,
        type: "leaveRoom",
        room: currentRoom.name,
        room_id: currentRoom._id,
        token: window.localStorage["token"],
      })
    );
    leftRoom();
  };
  
  return (
    <div className={groupDescStatus ? "chat1" : "chat"}>
      {currentRoom && (
        <header className="chatHeader" onClick={() => openGroupDesc(true)}>
          <Avatar src={currentRoom.group_icon} />
          <div className="chatHeaderData">
            <div>
            <h3>{currentRoom.name}</h3>
            <span className={groupDescStatus ? "chatUsers1" : "chatUsers"}>
              {currentRoom.type === "public"
                ? currentRoom.users.join(", ")
                : ""}
            </span>
            </div>
          </div>
          <div className="chatHeaderRight">
            <IconButton>
              <SearchOutlinedIcon />
            </IconButton>
            <IconButton onClick={leavRoom}>
              <ExitToAppIcon />
            </IconButton>
          </div>
        </header>
      )}
      <div id="chats" className="chatBody">
        {chats &&
          chats
            .filter((x) => x.room === currentRoom.name)
            .map((data, i) =>
              data.type === "message" ? (
                <div
                  key={i}
                  className={`chatMessage ${
                    data.user_id === user._id && "chatSender"
                  }`}
                >
                  <p>{data.user_name}</p>
                  <p className="dataMessage">{data.body}</p>
                  <div className="chatTimeStamp">
                    {new Date(
                      data.create_at ? data.create_at * 1000 : new Date()
                    ).getHours() +
                      ":" +
                      new Date(
                        data.create_at ? data.create_at * 1000 : new Date()
                      ).getMinutes()}
                  </div>
                </div>
              ) : (
                <p key={i} className={`chatJoinOrLeft`}>
                  {data.user_id === user._id
                    ? "you" + data.body.split("<check>")[1]
                    : data.body.split("<check>")[0] +
                      data.body.split("<check>")[1]}
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
