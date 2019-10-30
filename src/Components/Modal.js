import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function SimpleModal({ icao }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [flights, setFlights] = React.useState({});

  const handleOpen = () => {
    fetch(
      `https://opensky-network.org/api/flights/aircraft?icao24=${icao}&begin=1517184000&end=1517270400`
    )
      .then((response) => response.json())
      .then((flight) => {
        setFlights(flight);
        console.log(flights);
      });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button size="small" color="primary" onClick={handleOpen}>
        View More
      </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">{`Aircraft: ${icao}`}</h2>
          <p id="simple-modal-description">
            {`Number of Flights: ${flights.length}`}
          </p>
        </div>
      </Modal>
    </div>
  );
}
