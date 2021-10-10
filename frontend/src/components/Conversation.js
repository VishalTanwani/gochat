import React, { useEffect, useState } from "react";
import "./conversation.css";
import { Avatar } from "@material-ui/core";

function Conversation() {
  const [src, setSrc] = useState("");
  useEffect(() => {
    setSrc(Math.floor(Math.random() * 1000));
  }, []);
  return (
    <div className="conversation">
      <Avatar src={`https://avatars.dicebear.com/api/avataaars/${src}.svg`} />
      <div className="roomInfo">
        <h1>room name</h1>
        <p>last message ....</p>
      </div>
    </div>
  );
}

export default Conversation;
