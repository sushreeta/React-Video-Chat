import React, { useState } from "react";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import * as Yup from "yup";
import socket from '../socket/socket'

const useStyles = makeStyles(theme => ({
  message: {
    border: 1,
    padding: "10px",
    width: "80%"
  },
  send: {
    width: "10%",
    background: "rgb(130, 224, 255)",
    border: "none",
    padding: "10px"
  }
}));

const MessageInput = props => {

  const classes = useStyles();
  const [data, setData] = useState({
    textMessage: ""
  })
  const formik = useFormik({
    initialValues: data,
    validationSchema: Yup.object({
      textMessage: Yup.string().required()
    }),
    onSubmit: values => {
      socket.emit("event", {
        room: props.room,
        message: values.textMessage,
        name: props.name
      });
      formik.values.textMessage = ""
      setData({textMessage: ""})
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        className={classes.message}
        id="textMessage"
        name="textMessage"
        type="text"
        value={formik.values.textMessage}
        {...formik.getFieldProps("textMessage")}
      />

      {formik.touched.textMessage && formik.errors.textMessage ? (
        <div>{formik.errors.textMessage}</div>
      ) : null}

      <Button
        className={classes.send}
        type="submit"
        variant="contained"
        color="primary"
      >
        Send
      </Button>
    </form>
  );
};

export default MessageInput;
