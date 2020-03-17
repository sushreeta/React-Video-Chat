import React from "react";
import { CallEnd as CallEndIcon } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const EndCallButton = () => {
  return (
    <IconButton aria-label="Accept" variant="contained">
      <CallEndIcon variant="contained" fontSize="large" color="primary" />
    </IconButton>
  );
};
export default EndCallButton;
