import io from "socket.io-client";
import config from '../../config/config'

const socket = io.connect(`http://localhost:${config.SERVER_PORT}`);

export default socket;
