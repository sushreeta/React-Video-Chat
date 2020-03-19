import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import socket from '../socket/socket';

const useStyles = makeStyles(theme => ({
  list: {
    padding: "10px"
  }
}));

const MessageList = () => {

  const classes = useStyles();
  const [message, setMessage] = useState([]);
  
  socket.on("event", (text, name) => {setMessage([...message,{text, name}])});
  
  return (
    <ul id="list" className={classes.list}>
      {message.map(item => (
        <li key={item.text}>
          {item.name + ": " + item.text}
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
