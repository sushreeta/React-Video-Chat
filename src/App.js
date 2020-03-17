import React from "react";
import "./App.css";
import MainUi from './components/mainUI'
import IncomingCall from "./components/IncomingCall";
import MuteButton from "./components/Buttons/Mute";
import EndCall from './components/Buttons/EndCall'
import MessageButton from './components/Buttons/Message'
import HideVideoButton from './components/Buttons/HideVideo'



function App() {
  return (
    <div className="App">
      <MainUi/>
    
    </div>
  );
}

export default App;
