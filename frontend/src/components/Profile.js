import "./profile.css";
import React, { useContext, useState, useEffect, useRef } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Slide from 'react-reveal/Slide';
import { StateContext } from "../context/StateProvider"
import CreateIcon from '@material-ui/icons/Create';
import DoneIcon from '@material-ui/icons/Done';

function Profile() {
    const { profileStatue, openProfile, user } = useContext(StateContext)
    const [name, setName] = useState("")
    const [nameCheck, setNameCheck] = useState(true)
    const [about, setAbout] = useState("")
    const [aboutCheck, setAboutCheck] = useState(true)
    const nameInput = useRef()
    const aboutInput = useRef()
    useEffect(() => {
        setName(user && user.name)
        setAbout(user && user.about)
    }, [user])

    const handleClick = () => {
        openProfile(false)
    }

    const onNameSubmit = () => {
        setNameCheck(!nameCheck)
    }

    const onAboutSubmit = () => {
        setAboutCheck(!aboutCheck)
    }

    const clickName = async() => {
        await nameInput.current.focus()
        await setNameCheck(!nameCheck)
    }

    const clickAbout = () => {
        aboutInput.current.focus()
        setAboutCheck(!aboutCheck)
    }

    console.log(nameInput.current)
    return (
        <Slide left when={profileStatue}>
            <div className="profile">
                <header>
                    <div className="profile-header">
                        <div className="data">
                            <ArrowBackIcon  onClick={handleClick}/>
                            <p>Profile</p>
                        </div>
                    </div>
                </header>
                <div className="profile-body">
                    <div className="profile-image">
                        <img src={user && user.profile_image}/>
                    </div>
                    <div className="profile-name">
                        <p className="profile-detail-key">Your Name</p>
                        <div className={`profile-detail-value ${!nameCheck && "bottom-border"}`}>
                            {nameCheck 
                                ? <input type="text" disable={nameCheck} ref={nameInput} onChange={(e) => setName(e.target.value)} value={name}/>
                                : <input type="text" ref={nameInput} onChange={(e) => setName(e.target.value)} value={name}/>
                            }
                            {nameCheck 
                                ? <CreateIcon onClick={clickName}/>
                                :<DoneIcon onClick={onNameSubmit}/>
                            }
                        </div>
                    </div>
                    <p className="name-info">This is not your username or pin. This name will be visible to your WhatsApp contacts.</p>
                    <div className="profile-about">
                        <p className="profile-detail-key">About</p>
                        <div className={`profile-detail-value ${!aboutCheck && "bottom-border"}`}>
                            {aboutCheck
                                ? <textarea ref={aboutInput} disable={aboutCheck} onChange={(e) => setAbout(e.target.value)} value={about}/>
                                : <textarea ref={aboutInput} onChange={(e) => setAbout(e.target.value)} value={about}/>
                            }
                            {aboutCheck 
                                ? <CreateIcon onClick={clickAbout}/>
                                :<DoneIcon onClick={onAboutSubmit}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Slide>
    )
}

export default Profile
