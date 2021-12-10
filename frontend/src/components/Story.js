import React, { useContext, useEffect, useState } from 'react'
import "./story.css";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import { Avatar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { StateContext } from "../context/StateProvider";

function Story(props) {
    const {setStory, getStory, userStory, openStory, user} = useContext(StateContext);
    const [time, setTime] = useState(null)
    const [body, setBody] = useState("")
    const [bgColor, setBgColor] = useState(null)

    useEffect(() => {
        getStory()
        let bgColor = Math.floor(Math.random()*1000000)
        setBgColor(bgColor)
        return () =>{
            clearTimeout(time)
        }
    },[])

    const handleClose = async() => {
        await openStory(false); 
        await props.history.replace("/whatsapp")
        await clearTimeout(time)
    }

    const timeOut = async () => {
        var settime = await setTimeout(() => {
            openStory(false)
            props.history.replace("/whatsapp")
        }, 9900);
        await setTime(settime)
    }

    let size = body.length < 90 ? 5 : body.length < 180 ? 4 : body.length < 360 ? 3 : 2

    if (userStory && userStory.body){
        
        return (
            userStory && <div className="story" style={{backgroundColor: "#"+bgColor}} onLoad={() => timeOut()}>
                <div className="story-cross" onClick={handleClose}>
                    <CloseIcon/>
                </div>
                <div className="story-slider" >
                    <div className="story-status-slider1">
                        <div className="story-status-slider2"></div>
                    </div>
                </div>
                <div className="user-story">
                    <Avatar
                        src={user && user.profile_image}
                    />
                    <div className="user-story-name">
                        <h1>{user && user.name}</h1>
                    </div>
                </div>
                <div className="story-body" style={{backgroundColor: "#"+bgColor}}>
                    <p style={{fontSize:size+"vw"}}>{userStory.body}</p>
                </div>
            </div>
        )
    } else {
        return (
            userStory && <div className="story" style={{backgroundColor: "#"+bgColor}}>
                {body.length!==0 && <div className="story-cross" onClick={() => setStory(body)}>
                    <DoneIcon/>
                </div>}
                <div className="story-set" onClick={handleClose}>
                    <ArrowBackIcon/>
                </div>
                <div className="story-body" style={{backgroundColor: "#"+bgColor}}>
                    <textarea autoFocus value={body} placeholder="Enter text" onChange={(e) => setBody(e.target.value)} style={{backgroundColor: "#"+bgColor, fontSize:size+"vw"}}/>
                </div>
            </div> 
        )
    }
}

export default Story
