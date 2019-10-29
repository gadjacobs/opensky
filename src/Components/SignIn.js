import React, { Component } from "react";
import "../App.css";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onUserNameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitClick = () => {
    if (this.state.username === "demo" && this.state.password === "demo") {
      this.props.onRouteChange("home");
    }
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography style={{ color: "black" }} component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={this.onUserNameChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onPasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              style={{ color: "black" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={this.onSubmitClick}
            >
              Sign In
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://covenworks.com/">
              Coven Works
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    );
  }
}

export default SignIn;
