
const constraints = { audio: true, video: true };
const videoArea = document.querySelector("video");
navigator.getUserMedia = navigator.getUserMedia;

function onSuccess(stream) {
  console.log("success!!! We have started the video", stream);
  videoArea.srcObject = stream;
  videoArea.play();
}

function onError(error) {
  console.log("error loading video player", error);
}
navigator.getUserMedia(constraints, onSuccess, onError);