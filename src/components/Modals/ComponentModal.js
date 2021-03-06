import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  CardActionArea,
  Typography,
  Paper,
  Button,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    border: "none",
    outline: "none",
    width: "90%",
    height: "90%",
    margin: "auto",
    overflow: "hidden",
  },
  body: {
    height: "83vh",
    overflow: "auto",
    padding: theme.spacing(2),
  },
}));

export default function ComponentModal({
  title,
  component,
  status,
  closeModal,
}) {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={status}
      closeAfterTransition
      disableBackdropClick={false}
      disableEscapeKeyDown={false}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={status}>
        <Paper className={classes.paper}>
          <CardActionArea
            style={{
              position: "relative",
              display: "flex",
              height: "7vh",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" align="right">
              {title}
            </Typography>
            <Button
              style={{
                position: "absolute",
                right: "20px",
              }}
              variant="contained"
              color="secondary"
              onClick={closeModal}
            >
              close
            </Button>
          </CardActionArea>
          <Divider />
          <div className={classes.body}>{component}</div>
        </Paper>
      </Fade>
    </Modal>
  );
}
