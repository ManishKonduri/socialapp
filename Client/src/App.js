import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserRegistration from './User/UserRegistration';
import UserLogin from './User/UserLogin';
import Home from './SocialMedia/home';
import Profile from './Components/Profile';
import Settings from './Components/Settings';
import { w3cwebsocket as W3CWebSocket } from "websocket";

// const client = new W3CWebSocket('ws:/');

function App() {

    // React.useEffect(() => {
      
    //     client.onopen = () => {
    //         console.log('WebSocket Client Connected');
    //       };
    //       client.onmessage = (message) => {
    //         console.log(message);
    //       };
    // }, [])

  return (
    <Router>
        <Switch>
            <Route path="/" exact component={UserRegistration} />
            <Route path="/login" component={UserLogin} />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
        </Switch>
    </Router>
)
}

export default App;
