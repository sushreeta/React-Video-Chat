import React, { useRef } from "react";
// import io from "socket.io-client";
import socket from './socket/socket'
import {addLi, MessageList} from './textMessage/MessageList';
import MessageInput from './textMessage/MessageInput';
import userInfo from './UserInfo/info'
import "./ui.css";
// import "https://webrtc.github.io/adapter/adapter-latest.js";

const MainUi = () => {
  let isChannelReady = false;
  let isInitiator = false;
  let isStarted = false;
  let localStream;
  let pc;
  let remoteStream;
  let turnReady;

  let clientId;
  let recieverId;
  let message = [];
  let clientData = {
    room: "",
    name: "",
    id: ""
  };
 
  const room = prompt("Please enter room name");
  const clientName = prompt("Please enter your name");


  // const socket = io.connect("http://localhost:8006");

  if (room !== "") {
    socket.emit("create or join", room);
  }

  socket.on("created", () => {
    console.log("created...")
    console.log("isInitiator, created");
    isInitiator = true;
  });

  socket.on("full", room => {
    console.log("Room " + room + " is full");
  });

  socket.on("join", room => {
    console.log(" peer made a request to the room " + room);
    isChannelReady = true;
  });

  socket.on("joined", (room, socketId) => {
    console.log("joined" + room);
    clientData.room = room;
    clientData.id = socketId;
    clientData.name=clientName
    userInfo.room = clientData.room
    userInfo.name = clientData.name
    userInfo.socketId = clientData.id
    isChannelReady = true;
  });

  socket.on("log", array => {
    // console.log.apply(console, array);
  });

  const sendMessage = message => {
    console.log("Client sending message: ", message);
    socket.emit("message", message);
  };

  socket.on("message", message => {
    console.log("Client received message:", message);
    if (message === "got user media") {
      start();
    } else if (message.type === "offer") {
      if (!isInitiator && !isStarted) {
        start();
      }
      pc.setRemoteDescription(new RTCSessionDescription(message));
      doAnswer();
    } else if (message.type === "answer" && isStarted) {
      pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === "candidate" && isStarted) {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });
      pc.addIceCandidate(candidate);
    } else if (message === "bye" && isStarted) {
      handleRemoteHangup();
    }
  });

  // const send = (e) => {
  //   console.log("onclick send: ",e)
  //   socket.emit("event", {
  //     room: room,
  //     message: e.target.value,
  //     name: clientName
  //   });
  // };
  // const addLi = (msg, name) => {
  //   message.push({ name, message: msg });
  // };
  socket.on("event", (msg, name) => {addLi(msg, name)});

  const remoteVideo = useRef(null);
  const localVideo = useRef(null);
  console.log("local video", localVideo);

  function gotStream(stream) {
    console.log("Adding local stream.", stream);
    localStream = stream;
    console.log("local stream", localStream);
    localVideo.current.srcObject = stream;
    sendMessage("got user media");
    if (isInitiator) {
      start();
    }
  }
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true
    })
    .then(gotStream)
    .catch(e => {
      alert("error: " + e);
    });

  const constraints = {
    video: true
  };

  console.log("Getting user media with constraints", constraints);

  const start = () => {
    if (!isStarted && typeof localStream !== "undefined" && isChannelReady) {
      createPeerConnection();
      pc.addStream(localStream);
      isStarted = true;
      console.log("isInitiator", isInitiator);
      if (isInitiator) {
        doCall();
      }
    }
  };

  window.onbeforeunload = () => {
    sendMessage("bye");
  };

  const createPeerConnection = () => {
    try {
      pc = new RTCPeerConnection(null);
      pc.onicecandidate = handleIceCandidate;
      pc.onaddstream = handleRemoteStreamAdded;
      pc.onremovestream = handleRemoteStreamRemoved;
      console.log("Created RTCPeerConnnection");
    } catch (e) {
      console.log("Failed to create PeerConnection " + e.message);
      alert("Cannot create RTCPeerConnection.");
      return;
    }
  };

  const handleIceCandidate = event => {
    if (event.candidate) {
      sendMessage({
        type: "candidate",
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    } else {
      console.log("End of candidates.");
    }
  };

  const handleCreateOfferError = event => {
    console.log("createOffer() error: ", event);
  };

  const doCall = () => {
    console.log("Sending offer to peer");
    pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
  };

  const doAnswer = () => {
    console.log("Sending answer to peer.");
    pc.createAnswer().then(
      setLocalAndSendMessage,
      onCreateSessionDescriptionError
    );
  };

  const setLocalAndSendMessage = sessionDescription => {
    pc.setLocalDescription(sessionDescription);
    console.log("setLocalAndSendMessage sending message", sessionDescription);
    sendMessage(sessionDescription);
  };

  const onCreateSessionDescriptionError = error => {
    console.log("Failed to create session description: " + error.toString());
  };

  const handleRemoteStreamAdded = event => {
    console.log("Remote stream added.");
    remoteStream = event.stream;
    remoteVideo.current.srcObject = remoteStream;
  };

  const handleRemoteStreamRemoved = event => {
    console.log("Remote stream removed. Event: ", event);
  };

  const hangup = () => {
    console.log("Hanging up.");
    stop();
    sendMessage("bye");
  };

  const handleRemoteHangup = () => {
    console.log("Session terminated.");
    stop();
    isInitiator = false;
  };

  const stop = () => {
    isStarted = false;
    pc.close();
    pc = null;
  };
  return (
    <div>
      <div id="videos">
        <video id="localVideo" ref={localVideo} autoPlay />
        <video id="remoteVideo" ref={remoteVideo} autoPlay />
      </div>
      {/* <ul id="list">
        {message.map(item => (
          <li key={item.message}>
            {item.name}":"{item.message}
            {console.log("item", item)}
          </li>
        ))}
      </ul> */}
      <MessageList/>
      {/* <div id="input">
        <input type="text" id="message" />
        <button id="send" onClick={(e) => send(e)}>
          Send
        </button>
      </div> */}
      <MessageInput/>
    </div>
  );
};

export default MainUi;
