import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'

// let [message, handleMessage] = useState([]);
// const addLi = (msg, name) => {
//     // message.push({ name: name, message: msg });
//     handleMessage([...message, {name, message: msg}])
//     console.log("pushed msg ", name, msg, message)
//   };
  
const useStyles = makeStyles(theme => ({
    list: {
    // listStyleType: none,
    padding: '10px',
   }}));

const MessageList = (props)=>{

    const classes = useStyles();
    let [message, handleMessage] = useState([]);
    handleMessage([...message, {name: props.textMessage.name, message: props.textMessage.message}])
    console.log("pushed msg ", props)
    return (
        <ul id="list" className={classes.list}>
        {message.map(item => (
          <li key={item.message}>
            {item.name+": "+item.message}
            {console.log("item", item)}
          </li>
        ))}
      </ul>
    )
}
export default MessageList;