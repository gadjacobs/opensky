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
  const [flights, setFlights] = React.useState([]);

  const startTime = parseInt(
    (new Date("2019.10.29").getTime() / 1000).toFixed(0)
  );

  const endTime = parseInt(
    (new Date("2019.10.30").getTime() / 1000).toFixed(0)
  );

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  async function fetchFlights(icao, start, end) {
    const res = await fetch(
      `https://opensky-network.org/api/flights/aircraft?icao24=${icao}&begin=${start}&end=${end}`
    );
    res
      .json()
      .then((res) => setFlights(res))
      .catch((err) => console.log(err));
  }

  const handleOpen = () => {
    fetchFlights(icao, startTime, endTime);
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
          <h4>Flights in the Last 24 hours:</h4>
          {flights.map((flight, i) => (
            <p id="simple-modal-description">
              {
                  flight !== undefined || []
                ? `Call Sign: ${flight.callsign}, Departure: ${timeConverter(flight.firstSeen)}, Arrival: ${timeConverter(flight.lastSeen)}`
                : flight.length === 0
                ? "There are no flights within this period. Please check again later"
                : "Loading Flights"}
            </p>
          ))}
        </div>
      </Modal>
    </div>
  );
}
