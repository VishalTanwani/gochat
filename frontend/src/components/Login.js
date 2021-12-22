import React, { useContext, useEffect, useState } from 'react'
import "./login.css"
import { StateContext } from "../context/StateProvider"
import { IconButton } from "@material-ui/core";
import ArrowForward from '@material-ui/icons/ArrowForward';

function Login(props) {
    const { unifiedRegister, loginMessage } = useContext(StateContext)
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [error, setError] = useState(false)
    const [codeShow, setCodeShow] = useState(false)
    useEffect(() => {
        if (window && window.localStorage["token"]) {
            props.history.push("/whatsapp")
        }
    }, [props])
    const handleClick = async (e) => {
        e.preventDefault();
      if (email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ) {
        if (code === "") {
            unifiedRegister(email)
            setCodeShow(true)
        } else {
            unifiedRegister(email,code) 
        }
      } else {
        setError(true)
      }
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
                        {!codeShow 
                        ? <input type="text" placeholder="Email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)}/>
                        : <input type="number" placeholder="Code" autoFocus value={code} onChange={(e) => setCode(e.target.value)}/>}
                        <button type="submit">
                            login
                        </button>
                    </form>
                    <IconButton onClick={handleClick}>
                        <ArrowForward/>
                    </IconButton>
                </div>
                {loginMessage && <p>{loginMessage}</p>}
                {error && <p style={{color: "red"}}>email address is not valid</p>}
            </div>
        </div>
    )
}

export default Login
