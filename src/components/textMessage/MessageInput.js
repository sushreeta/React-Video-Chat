import React from 'react';
import { useFormik } from 'formik';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core';
import * as Yup from 'yup';
import socket from '../socket/socket'
import userInfo from '../UserInfo/info'


const useStyles = makeStyles(theme => ({
    message: {
        border: 1,
        padding: '10px',
        width: '80%',
      },
    send: {
        width: '10%',
        background: 'rgb(130, 224, 255)',
        border: 'none',
        padding: '10px',
}}));



const MessageInput = () => {

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
        textMessage: '',
    },
    validationSchema: Yup.object({
        textMessage: Yup.string()
          .required('Required')}),
    onSubmit: values => {
        console.log("onclick send: ",values)
        socket.emit("event", {
          room: userInfo.room,
          message: values,
          name: userInfo.name,
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
        <Box className={classes.message}>
      <TextField
        id="textMessage"
        name="textMessage"
        type="text"
        {...formik.getFieldProps('textMessage')}/>
      />
      {formik.touched.textMessage && formik.errors.textMessage ? (
        <div>{formik.errors.textMessage}</div>
      ) : null}


        <Box className={classes.send}>
          <button type="submit" action="Submit" variant ="contained" label="Send"/>  
        </Box>
        </Box>
    </form>
  )
}

export default MessageInput;