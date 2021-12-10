import "./sidebar.css";
import React, { useContext, useEffect, useState } from "react";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Conversation from "./Conversation";
import { StateContext } from "../context/StateProvider";

function SideBar(props) {
  const {
    getProfile,
    user,
    userRooms,
    getRooms,
    openProfile,
    currentRoom,
    searchRoom,
    searchRooms,
    logout,
    openStory
  } = useContext(StateContext);

  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(false)
  const open = Boolean(anchorEl);
  useEffect(() => {
    async function fetchData() {
      window.localStorage["token"] && (await getProfile());
      window.localStorage["token"] && (await getRooms());
    }
    fetchData();
  }, [currentRoom]);

  const onSubmit = async(e) => {
    e.preventDefault();
    let value = e.target.value
    await searchRoom(value)
    await setSearch(value)
  }

  const profileClick = () => {
    openProfile(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (text) => {
    console.log(text)
    text==="Logout" && logout()
    setAnchorEl(null)
  }

  return (
    <div className="sidebar">
      <header className="header">
        <>
          <Avatar src={user && user.profile_image} onClick={profileClick} />
          <div className="otherIcons">
            <IconButton onClick={() => {openStory(true); props.history.replace("/story")}}>
              <DonutLargeIcon />
            </IconButton>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              style={{top:"40px", left:"-50px"}}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={()=>handleClose("Logout")}>Logout</MenuItem>
            </Menu>
          </div>
        </>
      </header>
      <div className="search">
        <div className="search-container">
          <SearchOutlinedIcon
            onClick={onSubmit}
            style={{ fill: "gray", padding: "10px" }}
          />
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={search}
              onChange={(e) => onSubmit(e)}
              placeholder="Search or start new chat"
            />
            <button onClick={onSubmit} type="submit">
              send a message
            </button>
          </form>
        </div>
      </div>
      <div className="conversations">
        {search!=="" && searchRooms.length===0 && <Conversation type="create" search={search} setSearch={setSearch}/>}
        {searchRooms &&
          searchRooms.length !== 0 &&
          searchRooms.map((x, i) => (
            <Conversation key={i} data={x} type="search" search={search} setSearch={setSearch}/>
          ))}
        {search === "" && searchRooms.length === 0
          ? userRooms &&
            userRooms.map((x, i) => (
              <Conversation key={i} data={x} search={search} type="room" />
            ))
          : null}
      </div>
    </div>
  );
}

export default SideBar;
