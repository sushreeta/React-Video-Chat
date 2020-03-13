let isChannelReady = false;
let isInitiator = false;
let isStarted = false;
let localStream;
let pc;
let remoteStream;
let turnReady;

let clientId;
let recieverId;
const room = "Room1";

const socket = io.connect();

if (room !== "") {
  socket.emit("create or join", room);
}

socket.on("created", () => {
  isInitiator = true;
});

socket.on("full", room => {
  console.log("Room " + room + " is full");
});

socket.on("join", room => {
  console.log(" peer made a request to the room " + room);
  isChannelReady = true;
});

socket.on("joined", room => {
  console.log("joined" + room);
  isChannelReady = true;
});

socket.on("log", array => {
  console.log.apply(console, array);
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

const localVideo = document.querySelector("#localVideo");
const remoteVideo = document.querySelector("#remoteVideo");

const gotStream = stream => {
  console.log("Adding local stream.", stream);
  localStream = stream;
  localVideo.srcObject = stream;
  sendMessage("got user media");
  if (isInitiator) {
    start();
  }
};
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true
  })
  .then((e)=>{
    console.log("checking stream object",e)
    gotStream(e)
  })
  .catch(function(e) {
    alert("error: " + e.name);
  });

const constraints = {
  audio: true,
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
  remoteVideo.srcObject = remoteStream;
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
