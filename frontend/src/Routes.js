import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login"
import Container from "./components/Container"
import LandingPage from "./components/LandingPage";
import Story from "./components/Story";

export default () => {
    return (
        <>
            <Switch>
                <Route path="/" exact component={LandingPage}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/whatsapp" exact component={Container}/>
                <Route path="/story" exact component={Story}/>
            </Switch>
        </>
    )
}