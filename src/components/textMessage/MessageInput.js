import React from 'react';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Box } from '@material-ui/core';
import * as Yup from 'yup';


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



const MessageInput = (props) => {

  const classes = useStyles(); //will use it in future for formatting

  const formik = useFormik({
    initialValues: {
        textMessage: '',
    },
    validationSchema: Yup.object({
        textMessage: Yup.string()
          .required('Required')}),
    onSubmit: values => {
        console.log("onclick send: ",values.textMessage, props)
        props.handleSend({
          room: props.room,
          textMessage: values.textMessage,
          name: props.name,
        });
        values.textMessage=""
        
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="textMessage"
        name="textMessage"
        type="text"
        {...formik.getFieldProps('textMessage')}/>
    
      {formik.touched.textMessage && formik.errors.textMessage ? (
        <div>{formik.errors.textMessage}</div>
      ) : null}


        <Button type="submit" variant="contained" color="primary">Send</Button>  
    </form>
  )
}

export default MessageInput;