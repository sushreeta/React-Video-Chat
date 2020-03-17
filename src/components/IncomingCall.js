import React from "react";
import { CallEnd as CallEndIcon, Call as CallIcon } from "@material-ui/icons";
import {
  Typography,
  Grid,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "#fafbfc",
    height: "30%",
    width: "30%",
    padding: "10px"
  },
  avtar: {
    marginLeft: "10px",
    marginRight: "10px"
  },
});

const IncomingCall = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={6} sm={3} justify="center">
        <Avatar alt="Remy Sharp" src="" className={classes.avtar} />
      </Grid>
      <Grid item xs={6} sm={3} justify="center">
        <Typography variant="h6" component="h6">
          Name
        </Typography>
        <Typography variant="body2" component="body2">
          calling...
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3} justify="center">
        <IconButton aria-label="Accept" variant="contained">
          <CallIcon variant="contained" fontSize="large" color="primary" />
        </IconButton>
      </Grid>
      <Grid item xs={6} sm={3} justify="center">
        <IconButton className="fa fa-plus-circle" aria-label="Reject">
          <CallEndIcon
            variant="contained"
            className="fa fa-plus-circle"
            fontSize="large"
            color="secondary"
          />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default IncomingCall;
