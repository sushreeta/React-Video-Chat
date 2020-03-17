import React from 'react';
import { makeStyles } from '@material-ui/core/styles'

let message = [];
const addLi = (msg, name) => {
    message.push({ name, message: msg });
  };
  
  
const useStyles = makeStyles(theme => ({
    list: {
    // listStyleType: none,
    padding: '10px',
   }}));

const MessageList = ()=>{

    const classes = useStyles();

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
export {addLi, MessageList};