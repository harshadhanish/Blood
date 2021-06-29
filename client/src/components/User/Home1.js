import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Backdrop,
  CircularProgress,
  List,
  ListItem,
  Grid,
  Chip,
  Snackbar,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import theme from "../../theme/theme";
import "./Home1.css";
import { X, Edit3 } from "react-feather";
import Requested from "./Requested";
import Donated from "./Donated";
import DialogCustom from "../Common/DialogCustom";


function Home1() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [donateBlood, setDonateBlood] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [requestBlood, setRequestBlood] = useState(false);
  const [blood, setBlood] = useState("O+");
  const [count, setCount] = useState(0);
  const [viewReq, setViewReq] = useState(false);
  const [viewDonated, setViewDonated] = useState(false);
  const [edit, setEdit] = useState(false);

  const [name1, setName1] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("1990-05-24");
  const [phone, setPhone] = useState("");
  const [blood1, setBlood1] = useState("O+");
  const [country, setCountry] = useState("");
  const [states, setStates] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  async function getCurrentUser(id) {
    setLoading(true);
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/userByJwt?id=${localStorage.getItem(
          "bb_auth_token"
        )}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setUser(result.data);
        let data = result.data;
        setName1(data.name);
        setEmail(data.email);
        setDob(data.dob);
        setCity(data.city);
        setCountry(data.country);
        setBlood1(data.bloodGroup);
        setStates(data.state);
        setPhone(data.phone);
        setPassword(data.password);
        result.data.active
          ? setAlertMessage(`Welcome back ${result.data.name}`)
          : setAlertMessage(
              `Welcome back ${result.data.name}. You have been blocked by the admin. Contact Admin for further procedure to unblock the account!`
            );
        setShowAlert(true);
        setLoading(false);
      }
    } catch (err) {
      if (err.message.includes("401")) {
        setAlertMessage(`You are not Authorized. Login to continue.`);
        setShowAlert(true);
        setTimeout(() => {
          window.location.href = "login";
        }, 2000);
      }
      window.alert(err.message);
      setLoading(false);
    }
  }

  async function bloodDonate() {
    if (
      new Date(localStorage.getItem("lastDonatedDate")).getDate() ===
      new Date().getDate()
    ) {
      setDonateBlood(false);
      window.alert(
        `You have recently donated on ${localStorage.getItem(
          "lastDonatedDate"
        )}. Please wait for 24hrs - 48hrs window so that your body will reproduce again. Try again after a day. Thank you`
      );
    } else {
      setDonateBlood(false);
      setLoading(true);
      let result;
      try {
        let data = {
          date: new Date().toISOString().substring(0, 10),
          quantity: 1,
        };

        result = await axios({
          url: `${process.env.REACT_APP_URL}/donateBlood?id=${user.id}`,
          method: "post",
          data: data,
        });

        if (result.status === 200) {
          window.alert(result.data.message);
          localStorage.setItem(
            "lastDonatedDate",
            new Date().toISOString().substring(0, 10)
          );
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        window.alert(err.response.data.message);
      }
    }
  }

  async function requestingBlood() {
    setRequestBlood(false);
    setLoading(true);
    let result;
    try {
      let data = {
        bloodGroup: blood.toLowerCase(),
        quantity: count,
      };

      result = await axios({
        url: `${process.env.REACT_APP_URL}/reciveBlood?id=${user.id}`,
        method: "post",
        data: data,
      });

      if (result.status === 200) {
        window.alert(
          "Request Sent!. Click View Requested Details to know more. "
        );
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      err.response !== null && err.response !== undefined
        ? window.alert(err.response.data.message)
        : window.alert(err.message);
    }
  }

  async function editProfile(e) {
    if (password === cpassword) {
      const data = {
        name: name1,
        email,
        dob,
        phone,
        bloodGroup: blood1,
        country,
        state: states,
        city,
        password,
      };
      data.dob = dob;
      let result;
      try {
        result = await axios({
          url: `${process.env.REACT_APP_URL}/updateUser?id=${user.id}`,
          method: "put",
          data: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
          },
        });
        if (result.status === 200) {
          window.alert("Details Updated successfully");
          window.location.reload();
        } else if (result.status === 400) {
          window.alert(result.data.message);
          window.location.reload();
        }
      } catch (err) {
        err.response !== null && err.response !== undefined
          ? window.alert(err.response.data.message)
          : window.alert(err.message);
      }
    } else {
      window.alert("Password and Confirm Password doesn't match");
    }
  }
  
  useEffect(() => {
    getCurrentUser();
  }, []);

  const whenRequest = (
    <p>
      BloodBank {`->`}
      <span
        style={{
          color: "#11cb5f",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        href="#"
        onClick={() => {
          setShowHome(true);
          setViewReq(false);
          setViewDonated(false);
        }}
      >
        Home
      </span>{" "}
      {`->`} {viewReq ? "All Requested Details" : "All Donated Details"}{" "}
    </p>
  );
  return (
    <div>
      <Card elevation={6} id="welcome-card">
        <div>
          <h3 className="welcome">
            Welcome{" "}
            {user.name !== undefined &&
              (user.name === "" ? "User!" : `${user.name}!`)}
            <Chip
              style={{
                background: user.active ? "green" : "red",
                marginLeft: "1rem",
              }}
              label={user.active ? "Active" : "Blocked"}
            />
          </h3>

          <Button
            className="logout"
            style={{ background: "red", color: "#fff" }}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              localStorage.removeItem("bb_auth_token");
              window.alert("Logged Out Successfully!");
              window.location.href = "/";
            }}
          >
            Logout
          </Button>
          <br />
          <p style={{ fontSize: "1rem" }}>
            {user.active
              ? showHome
                ? "Bloodbank -> Home"
                : viewReq
                ? whenRequest
                : whenRequest
              : "You can't perform any action as you are blocked!. "}
          </p>
          <br />
          <Button
            className="options"
            variant="contained"
            size="small"
            color="primary"
            disabled={user.active ? false : true}
            onClick={() => {
              setDonateBlood(true);
            }}
          >
            Donate Blood
          </Button>
          <Button
            className="options"
            variant="contained"
            size="small"
            color="secondary"
            disabled={user.active ? false : true}
            onClick={() => {
              setRequestBlood(true);
            }}
          >
            Request Blood{" "}
          </Button>
          <Button
            className="options"
            variant="contained"
            size="small"
            color="main"
            disabled={user.active ? false : true}
            style={{
              backgroundColor: !user.active
                ? "rgba(255, 255, 255, 0.12)"
                : "#9c27b0",
              color: !user.active ? "color: rgba(255, 255, 255, 0.3)" : "#fff",
            }}
            onClick={() => {
              setViewReq(false);
              setShowHome(false);
              setViewDonated(true);
            }}
          >
            View Donated Details{" "}
          </Button>
          <Button
            className="options"
            variant="contained"
            size="small"
            color="error"
            disabled={user.active ? false : true}
            style={{
              backgroundColor: !user.active
                ? "rgba(255, 255, 255, 0.12)"
                : "#1e88e5",
              color: !user.active ? "color: rgba(255, 255, 255, 0.3)" : "#fff",
            }}
            onClick={() => {
              setViewReq(true);
              setShowHome(false);
              setViewDonated(false);
            }}
          >
            View Requested Details
          </Button>
        </div>
      </Card>
      {showHome && (
        <List
          component="nav"
          aria-label="secondary mailbox folders"
          style={{ width: "60%", margin: "auto" }}
        >
          <h3>
            Profile Details &nbsp;{" "}
            <Tooltip title="Edit Profile">
              <Edit3
                style={{ color: "teal", cursor: "pointer" }}
                onClick={() => setEdit(true)}
              />
            </Tooltip>{" "}
          </h3>
          <hr />
          <Grid container>
            {Object.keys(user).map((key, index) => {
              if (key === "id" || key === "roles" || key === "active")
                return null;
              else {
                return (
                  <Grid item sm={6} key={index}>
                    <ListItem>
                      <p style={{ fontSize: "1rem" }}>
                        <b>{key.charAt(0).toUpperCase() + key.slice(1)} : </b>{" "}
                        {user[key]}
                      </p>
                    </ListItem>
                  </Grid>
                );
              }
            })}
          </Grid>
        </List>
      )}

      {viewReq && (
        <>
          <Requested user={user} />
        </>
      )}

      {viewDonated && (
        <>
          <Donated user={user} />
        </>
      )}

      <Backdrop open={loading} style={{ zIndex: theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {donateBlood && (
        <DialogCustom
          open={donateBlood}
          setOpen={setDonateBlood}
          successAction={bloodDonate}
          title="Verify that you are eligible for Blood Donation !"
          type="donate"
        />
      )}

      {requestBlood && (
        <DialogCustom
          open={requestBlood}
          setOpen={setRequestBlood}
          blood={blood}
          setBlood={setBlood}
          count={count}
          setCount={setCount}
          successAction={requestingBlood}
          title="Requesting Blood - Mention Blood Group and Quantity"
          type="receive"
        />
      )}

      {edit && (
        <DialogCustom
          open={edit}
          setOpen={setEdit}
          name1={name1}
          setName1={setName1}
          email={email}
          setEmail={setEmail}
          dob={dob}
          setDob={setDob}
          phone={phone}
          setPhone={setPhone}
          blood1={blood1}
          setBlood1={setBlood1}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          states={states}
          setStates={setStates}
          password={password}
          setPassword={setPassword}
          cpassword={cpassword}
          setCpassword={setCpassword}
          successAction={editProfile}
          title="Edit Profile"
          type="profile"
        />
      )}

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        message={alertMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setShowAlert(false)}
            >
              <X fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default Home1;
