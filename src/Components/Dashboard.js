import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
// import Button from "@material-ui/core/Button";
import FlightIcon from "@material-ui/icons/FlightSharp";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import SimpleModal from "./Modal";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://covenworks.com/">
        Coven Works
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  },
  flightIcon: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };
  }

  onSubmitClick = () => {
    this.props.onRouteChange("signin");
  };

  componentDidMount() {

  }
  render() {
    const cards = this.props.names;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.FlightIcon}
              color="inherit"
              aria-label="menu"
            >
              <FlightIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              SKY-GAD
            </Typography>
            <Button color="inherit" onClick={this.onSubmitClick}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Sky-Gad
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Sky-Gad {"(sky guide)"} is a simple React application that
                consumes the OpenSky API to show major cities and their air
                traffic.
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
            {cards.map((card, i) => (
                <Grid item key={cards[i]["icao"]} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={`https://source.unsplash.com/featured/?${cards[i]["name"]}`}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {`${cards[i]["name"]}`}
                      </Typography>
                      <Typography>
                        {cards[i]["location"]}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <SimpleModal icao={cards[i]["icao"]} />
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Sky-Gad
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Built for Coven Works by Gad Jacobs
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </React.Fragment>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
