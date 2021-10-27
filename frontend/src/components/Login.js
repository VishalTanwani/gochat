import React, { useContext, useEffect, useState } from 'react'
import "./login.css"
import { StateContext } from "../context/StateProvider"
import { IconButton } from "@material-ui/core";
import ArrowForward from '@material-ui/icons/ArrowForward';

function Login(props) {
    const [email, setEmail] = useState("")
    useEffect(() => {
        if (window && window.localStorage["token"]) {
            props.history.push("/whatsapp")
        }
    }, [props])
    const { unifiedRegister } = useContext(StateContext)
    const handleClick = () => {
        console.log("object")
        unifiedRegister(email)
    }
    return (
        <div className="login">
            <div className="login-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsapplogo"/>
                <div className="login-text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <div className="login-form">

                <input type="text" placeholder="Email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)}/>
                <IconButton onClick={handleClick}>
                    <ArrowForward/>
                </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Login
