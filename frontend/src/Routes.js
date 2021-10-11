import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login"
import SideBar from "./components/SideBar"
import Chat from "./components/Chat"
import LandingPage from "./components/LandingPage";

export default () => {
    return (
        <>
            <Switch>
                <Route path="/" exact component={LandingPage}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/whatsapp" exact component={SideBar}/>
                <Route path="/whatsapp" exact component={Chat}/>
            </Switch>
        </>
    )
}