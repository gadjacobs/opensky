import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  card: {
    minWidth: 275,
    marginBottom: theme.spacing(2)
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

export default function SimpleModal({ icao, name }) {
  const [open, setOpen] = React.useState(false);
  const [arrivals, setArrivals] = React.useState([]);
  const [departures, setDepartures] = React.useState([]);
  const [arrivalTime, setArrivalTime] = React.useState("");
  const [departureTime, setDepartureTime] = React.useState("");
  const classes = useStyles();

  const startTime = (time) => {
    return Math.floor(Date.now() / 1000) - time * 60;
  };

  const endTime = Math.round(new Date().getTime() / 1000);

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  async function fetchArrivals(icao, start, end) {
    const arrivals = await fetch(
      `https://opensky-network.org/api/flights/arrival?airport=${icao}&begin=${start}&end=${end}`
    );
    arrivals
      .json()
      .then((arrival) => setArrivals(arrival))
      .catch((err) => console.log(err));
  }

  async function fetchDepartures(icao, start, end) {
    const departures = await fetch(
      `https://opensky-network.org/api/flights/departure?airport=${icao}&begin=${start}&end=${end}`
    );
    departures
      .json()
      .then((departure) => setDepartures(departure))
      .catch((err) => console.log(err));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleArrivalChange = (event) => {
    setArrivalTime(event.target.value);
    fetchArrivals(icao, startTime(event.target.value), endTime);
  };

  const handleDepartureChange = (event) => {
    setDepartureTime(event.target.value);
    fetchDepartures(icao, startTime(event.target.value), endTime);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        View More
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{name}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`ICAO: ${icao}`}</DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography component="h3">Departures:</Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Last
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={departureTime}
                    onChange={handleDepartureChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                    <MenuItem value={120}>120</MenuItem>
                    <MenuItem value={360}>360</MenuItem>
                  </Select>
                  <FormHelperText>Minutes</FormHelperText>
                </FormControl>
              </Paper>
              <Paper className={classes.paper}>
                {departures.map((departure, i) =>
                  departures.length === 0 || departures === [] || departures === {} ? (
                    <h4 id="simple-modal-description">
                      {
                        "There are no flights within this period. Please check again later, or try another option."
                      }
                    </h4>
                  ) : (
                    <Card key={i} className={classes.card}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          From:
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {departure.estDepartureAirport}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {timeConverter(departure.firstSeen)}
                        </Typography>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          To:
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {departure.estArrivalAirport}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {timeConverter(departure.lastSeen)}
                        </Typography>
                      </CardContent>
                    </Card>
                  )
                  )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography component="h3">departures:</Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Last
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={arrivalTime}
                    onChange={handleArrivalChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={60}>60</MenuItem>
                    <MenuItem value={120}>120</MenuItem>
                    <MenuItem value={360}>360</MenuItem>
                  </Select>
                  <FormHelperText>Minutes</FormHelperText>
                </FormControl>
              </Paper>
              <Paper className={classes.paper}>
                {arrivals.map((arrival, i) =>
                  arrivals.length === 0 || arrivals === [] || arrivals === {} ? (
                    <h4 id="simple-modal-description">
                      {
                        "There are no flights within this period. Please check again later, or try another option."
                      }
                    </h4>
                  ) : (
                    <Card key={i} className={classes.card}>
                      <CardContent>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          From:
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {arrival.estDepartureAirport}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {timeConverter(arrival.firstSeen)}
                        </Typography>
                        <Typography
                          className={classes.title}
                          color="textSecondary"
                          gutterBottom
                        >
                          To:
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {arrival.estArrivalAirport}
                        </Typography>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {timeConverter(arrival.lastSeen)}
                        </Typography>
                      </CardContent>
                    </Card>
                  )
                  )}
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
