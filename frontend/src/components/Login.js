import React, { useContext, useEffect, useState } from 'react'
import "./login.css"
import { StateContext } from "../context/StateProvider"
import { IconButton } from "@material-ui/core";
import ArrowForward from '@material-ui/icons/ArrowForward';

function Login(props) {
    const { unifiedRegister } = useContext(StateContext)
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    useEffect(() => {
        if (window && window.localStorage["token"]) {
            props.history.push("/whatsapp")
        }
    }, [props])
    const handleClick = async (e) => {
        e.preventDefault();
        email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? unifiedRegister(email) : setError(true)
    }
    return (
        <div className="login">
            <div className="login-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsapplogo"/>
                <div className="login-text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <div className="login-form">
                    <form onSubmit={handleClick}>
                        <input type="text" placeholder="Email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <button type="submit">
                            login
                        </button>
                    </form>
                    <IconButton onClick={handleClick}>
                        <ArrowForward/>
                    </IconButton>
                </div>
                {error && <p>email address is not valid</p>}
            </div>
        </div>
    )
}

export default Login
