import React, { useEffect, useState } from "react";
import "./conversation.css";
import { Avatar } from "@material-ui/core";

function Conversation(props) {
  const { data } = props;
  return (
    <div className="conversation">
      <Avatar
        src={`https://avatars.dicebear.com/api/avataaars/${data.group_icon}.svg`}
      />
      <div className="roomInfo">
        <h1>{data.name}</h1>
        <p>last message ....</p>
      </div>
    </div>
  );
}

export default Conversation;
