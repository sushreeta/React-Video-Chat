import React from "react";
import { Message as MessageIcon } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const MessageButton = () => {
  return (
    <IconButton aria-label="Accept" variant="contained">
      <MessageIcon variant="contained" fontSize="large" color="primary" />
    </IconButton>
  );
};
export default MessageButton;
