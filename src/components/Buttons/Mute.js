import React from "react";
import { MicOff as MicOffIcon } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

const MuteButton = () => {
  return (
    <IconButton aria-label="Accept" variant="contained">
      <MicOffIcon variant="contained" fontSize="large" color="primary" />
    </IconButton>
  );
};
export default MuteButton;
