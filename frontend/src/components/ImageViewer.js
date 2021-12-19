import React, { useContext, useState } from "react";
import { StateContext } from "../context/StateProvider";
import { IconButton, Avatar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./ImageViewer.css"
import aes256 from "aes256"
import axios from "axios"

function ImageViewer() {
    const {
        image,
        imageViewerStatus,
        imageViewer,
        user,
    } = useContext(StateContext);

    const [imageUser, setImageUser] = useState(null)
    
    const getData = () => {
        axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/user/get", {
          "Content-Type": "application/json",
          _id: image && image.user_id,
        })
        .then(function (response) {
            setImageUser(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    const imageDownload = async() => {
        const file = await fetch(image.image)
        const imageBlog = await file.blob()
        const imageURL = URL.createObjectURL(imageBlog)

        const link = document.createElement('a')
        link.href = imageURL
        link.download = 'gochatImage'+new Date().getTime().toString()
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        imageViewerStatus && <div className="image-viewer" onLoad={getData}>
            <header className="image-viewer-header">
                {imageUser && user && <div className="image-viewer-header-user">
                    <Avatar src={imageUser.profile_image}/>
                    <div>
                        <p>{imageUser._id === user._id ? "You" : imageUser.name} @ {image.room}</p>
                        <span>{new Date().toLocaleDateString("en-US")} at&nbsp; 
                            {new Date(image.create_at ? image.create_at * 1000 : new Date()).getHours() +
                            ":" +
                            new Date(image.create_at ? image.create_at * 1000 : new Date()).getMinutes()}
                        </span>
                    </div>
                </div>}
                <div>
                    <IconButton onClick={imageDownload}>
                        <img alt="download" src="https://img.icons8.com/material-rounded/24/000000/download--v1.png"/>
                    </IconButton>
                    <IconButton onClick={() => imageViewer(false)}>
                        <CloseIcon style={{color:"black"}}/>
                    </IconButton>
                </div>
            </header>
            <div onClick={() => imageViewer(false)} className="image-viewer-body">
                <img src={aes256.decrypt(image.room_id,image.image)} alt="userImage" onClick={(e) => e.stopPropagation()}/>
            </div>
        </div>
    )
}

export default ImageViewer
