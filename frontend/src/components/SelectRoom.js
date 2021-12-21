import React from 'react'
import "./selectroom.css";
import golang from "../assets/golang logo.png"
import react from "../assets/react logo.png"

function SelectRoom() {
    return (
        <div className="select-room">
            <div className="select-room-images">
                <img src={react} alt="reactLogo"/>
                <span>&#43;</span>
                <img src={golang} alt="golangLogo"/>
            </div>
            <p>WhatsApp Web <br/>built in GoLang & React</p>
            <span>Select the chat to start messaging <br/>this is an end ot end encription messaging website</span>
            <hr></hr>
        </div>
    )
}

export default SelectRoom
