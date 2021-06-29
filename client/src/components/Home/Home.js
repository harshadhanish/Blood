import React from "react";
import bloodbank from "../../assests/2.gif";
import blooddonate from "../../assests/3.gif";
import needblood from "../../assests/4.gif";
import {Grid } from "@material-ui/core";
import Cards from "../Common/Cards";
import "./Home.css";

const data = [
  {
    name : "Are You a Blood Donor",
    desc: "Donate Blood and Save Lives",
    alt:"Blood Donate"
  },
  {
    name : "Need Blood ?",
    desc: "We got you covered!",
    alt:"Need Help"
  }
]
function Home() {
  return (
    <>
      <div className="home-hero">
        <img src={bloodbank} alt="blood_bank_home" />
      </div>
      <Grid container justify="space-around">
        <Grid item sm={3} xs={12}>
          <Cards image={blooddonate} data={data[0]} />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Cards image={needblood} data={data[1]} />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
