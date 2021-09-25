import "./sidebar.css";
import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Conversation from "./Conversation"

function SideBar() {
  return (
    <div className="sidebar">
      <header className="header">
        <Avatar />
        <div className="otherIcons">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </header>
      <div className="search">
        <div className="search-container">
          <SearchOutlinedIcon style={{fill:"gray", padding:"10px"}} />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="conversations">
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
          <Conversation/>
      </div>
    </div>
  );
}

export default SideBar;
