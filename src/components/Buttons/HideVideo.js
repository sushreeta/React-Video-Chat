import React from "react";
import { VideocamOff as VideocamOffIcon } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const MuteButton = () => {
  return (
    <IconButton aria-label="Accept" variant="contained">
      <VideocamOffIcon variant="contained" fontSize="large" color="primary" />
    </IconButton>
  );
};
export default MuteButton;
