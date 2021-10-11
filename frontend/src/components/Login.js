import React, { useContext, useEffect } from 'react'
import "./login.css"
import { Button } from '@material-ui/core'
import { StateContext } from "../context/StateProvider"

function Login(props) {
    useEffect(() => {
        if (window && window.localStorage["token"]) {
            props.history.push("/whatsapp")
        }
    }, [props])
    const { unifiedRegister } = useContext(StateContext)
    const handleClick = async () => {
        await unifiedRegister("vishal@gmail.com")
        await props.history.push("/whatsapp")
    }
    return (
        <div className="login">
            <div className="login-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsapplogo"/>
                <div className="login-text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={handleClick}>
                    Sign In With Email
                </Button>
            </div>
        </div>
    )
}

export default Login
