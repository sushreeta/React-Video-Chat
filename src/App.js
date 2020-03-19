import React from "react";
import { Router, Route } from "react-router-dom";
import { Link } from "@material-ui/core";
import MainUi from "./components/mainUI";
import "./App.css";

const createHistory = require("history").createBrowserHistory;
const history = createHistory();

function App() {
  const room = prompt("Please enter room name");
  const clientName = prompt("Please enter your name");
  return (
    <Router history={history}>
      <Link to="/"></Link>
      <Route exact path="/">
        <MainUi room={room} name={clientName} />
      </Route>
    </Router>
  );
}

export default App;
