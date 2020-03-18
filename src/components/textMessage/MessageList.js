import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import socket from '../socket/socket'

// let [message, handleMessage] = useState([]);
// const addLi = (msg, name) => {
//     // message.push({ name: name, message: msg });
//     handleMessage([...message, {name, message: msg}])
//     console.log("pushed msg ", name, msg, message)
//   };

const useStyles = makeStyles(theme => ({
  list: {
    // listStyleType: none,
    padding: "10px"
  }
}));

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const MessageList = () => {
  const classes = useStyles();
  // const [message, setMessage] = useState([]);
  const [message, setMessage] = useState([]);
  // let propMessage = props.textMessage.message;
  // const prevValue = !!usePrevious({ propMessage });
  
  // console.log("Previous value",prevValue)
  socket.on("event", (text, name) => {setMessage([...message,{text, name}])});
  console.log("TextMessage",message)

  // useEffect(() => {
    
  //   console.log("Previous value",prevValue)
  //   if (!!prevValue.message != props.textMessage.message) {
  //     setMessage([
  //       ...message,
  //       { name: props.textMessage.name, message: props.textMessage.message }
  //     ]);
  //     console.log("pushed msg ", props);
  //   }
  // }, [props.textMessage.message]);

  return (
    <ul id="list" className={classes.list}>
      {message.map(item => (
        <li key={item.text}>
          {item.name + ": " + item.text}
          {console.log("item", item)}
        </li>
      ))}
    </ul>
  );
};
export default MessageList;
