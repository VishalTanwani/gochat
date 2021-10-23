import "./sidebar.css";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Conversation from "./Conversation";
import { StateContext } from "../context/StateProvider";

function SideBar() {
  const {
    getProfile,
    user,
    userRooms,
    getRooms,
    openProfile,
    profileStatue,
  } = useContext(StateContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      !user && (await getProfile(window.localStorage["token"]));
      !user && (await getRooms(window.localStorage["token"]));
    }
    fetchData();
  }, []);

  const onSubmit = () => {
    console.log("object");
  };

  const profileClick = () => {
    openProfile(true);
  };

  return (
    <div className="sidebar">
      <header className="header">
        <>
          <Avatar src={user && user.profile_image} onClick={profileClick} />
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
        </>
      </header>
      <div className="search">
        <div className="search-container">
          <SearchOutlinedIcon style={{ fill: "gray", padding: "10px" }} />
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search or start new chat"
            />
            <button onClick={onSubmit} type="submit">
              send a message
            </button>
          </form>
        </div>
      </div>
      <div className="conversations">
        {userRooms &&
          userRooms.map((x, i) => <Conversation key={i} data={x} />)}
      </div>
    </div>
  );
}

export default SideBar;
