import React, { useContext } from 'react'
import "./login.css"
import { Button } from '@material-ui/core'
import { StateContext } from "../context/StateProvider"

function Login() {
    const { unifiedRegister } = useContext(StateContext)
    return (
        <div className="login">
            <div className="login-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsapplogo"/>
                <div className="login-text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={() => unifiedRegister("vishal2@gmail.com")}>
                    Sign In With Email
                </Button>
            </div>
        </div>
    )
}

export default Login
