import io from "socket.io-client";
const socket = io.connect("http://localhost:8006");
export default socket;
