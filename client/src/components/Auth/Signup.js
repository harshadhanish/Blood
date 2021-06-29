import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Grid,
  Box,
  Typography,
  makeStyles,
  Select,
} from "@material-ui/core";
import axios from "axios";
import bg from "../../assests/1.jpg";
import { validateEmail, validatePassword,validateText } from "../Common/validator";

//copyright function
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Blood Bank
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("1990-05-24");
  const [phone, setPhone] = useState("");
  const [blood, setBlood] = useState("O+");
  const [country, setCountry] = useState("");
  const [states, setStates] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  async function signup(e) {
    e.preventDefault();
    if (password === cpassword) {
      const data = {
        name,
        email,
        dob,
        phone,
        bloodGroup: blood.toLowerCase(),
        country,
        state: states,
        city,
        password,
      };
      data.dob = dob;
      let result;
      try {
        result = await axios({
          url: `${process.env.REACT_APP_URL}/signup`,
          method: "post",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (result.status === 200) {
          window.alert(result.data.message);
          window.location.href = "login";
        } else if (result.status === 400) {
          window.alert(result.data.message);
        }
      } catch (err) {
        window.alert(err.message);
      }
    } else {
      window.alert("Password and Confirm Password doesn't match");
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  min="7"
                  id="firstName"
                  label="Name"
                  helperText={
                    name.length > 1 &&
                    !validateText(name) &&
                    "Name is Not Valid. It should only contain text not other characters."
                  }
                  error={name.length > 1 && !validateText(name)}
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  helperText={
                    email.length > 1 &&
                    !validateEmail(email) &&
                    "Email is Not Valid"
                  }
                  error={email.length > 1 && !validateEmail(email)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  required
                  style={{
                    width: "90%",
                    border: "1px solid grey",
                  }}
                  id="date"
                  variant="outlined"
                  label="Date of Birth"
                  type="date"
                  max="2001-01-01"
                  className="MuiInputBase-input MuiOutlinedInput-input MuiOutlinedInput-root "
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  type="number"
                  name="mobile"
                  autoComplete="mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  native
                  value={blood}
                  required
                  fullWidth
                  onChange={(e) => setBlood(e.target.value)}
                  variant="outlined"
                  inputProps={{
                    name: "blood",
                    id: "blood-native-simple",
                  }}
                >
                  <option value={"O+"}>O +ive</option>
                  <option value={"O-"}>O -ive</option>
                  <option value={"A+"}>A +ive</option>
                  <option value={"A-"}>A -ive</option>
                  <option value={"B+"}>B +ive</option>
                  <option value={"B-"}>B -ive</option>
                  <option value={"AB+"}>AB +ive</option>
                  <option value={"AB-"}>AB -ive</option>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  helperText={
                    country.length > 1 &&
                    !validateText(country) &&
                    "Country is Not Valid. It should only contain text not other characters."
                  }
                  error={country.length > 1 && !validateText(country)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="state"
                  value={states}
                  onChange={(e) => setStates(e.target.value)}
                  helperText={
                    states.length > 1 &&
                    !validateText(states) &&
                    "State is Not Valid. It should only contain text not other characters."
                  }
                  error={states.length > 1 && !validateText(states)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  helperText={
                    city.length > 1 &&
                    !validateText(city) &&
                    "City is Not Valid. It should only contain text not other characters."
                  }
                  error={city.length > 1 && !validateText(city)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  helperText={
                    password.length > 1 &&
                    !validatePassword(password) &&
                    "Password is not Valid"
                  }
                  error={password.length > 1 && !validatePassword(password)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="confirm password"
                  autoComplete="confirm-password"
                  value={cpassword}
                  onChange={(e) => {
                    setCpassword(e.target.value);
                  }}
                  helperText={
                    password !== cpassword &&
                    "Passwords doesn't match"
                  }
                  error={password !== cpassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => signup(e)}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Box mt={1}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
