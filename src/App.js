import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainUi from './components/mainUI'
import { Link } from "@material-ui/core";
// import IncomingCall from "./components/IncomingCall";
// import MuteButton from "./components/Buttons/Mute";
// import EndCall from './components/Buttons/EndCall'
// import MessageButton from './components/Buttons/Message'
// import HideVideoButton from './components/Buttons/HideVideo'

const createHistory = require("history").createBrowserHistory;
const history = createHistory();

function App() {
  return (
    // <div className="App">
    <Router history={history}>
      <Link to="/"></Link>
      <Route exact path="/" component={MainUi} />,
    </Router>
      
    // </div>
  );
}

export default App;
