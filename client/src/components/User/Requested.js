import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Backdrop,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Drawer,
  Tooltip,
} from "@material-ui/core";
import theme from "../../theme/theme";
import { Info } from "react-feather";
function Requested(props) {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [donor, setDonor] = useState(false);
  const [index1, setIndex1] = useState(0);
  const [load, setLoad] = useState(false);

  async function getRequestedList() {
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/GetRecivedDetailByUser?id=${props.user.id}`,
        method: "get",
      });

      if (result.status === 200) {
        setLoad(true);
        setList(result.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      err.response !== null && err.response !== undefined
      ? window.alert(err.response.data.message)
      : window.alert(err.message);
    }
  }
  useEffect(() => {
    getRequestedList();
    // eslint-disable-next-line
  }, []);
  return (
    <>

      <div style={{ width: "60%", margin: "auto" }}>
        <br />
        <br />
        { load ?
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ background: "#fff" }}>
              <TableRow>
                <TableCell style={{ color: "#000" }}>S.No</TableCell>
                <TableCell style={{ color: "#000" }}>Blood Group</TableCell>
                <TableCell style={{ color: "#000" }}>Requested Date</TableCell>
                <TableCell style={{ color: "#000" }}>Quantity</TableCell>
                <TableCell style={{ color: "#000" }}>Donor </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length > 0 ? (
                list.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    style={{ cursor: "pointer" }}
                    // onClick={() => {
                    //   setOpen(true);
                    //   getUserById(row.id);
                    // }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.bloodGroup.toUpperCase()}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setIndex1(index);
                          setDonor(true);
                        }}
                      >
                        View Donor Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableCell colSpan={8}>
                  {" "}
                  <h2 style={{ textAlign: "center" }}>No Data Found!.</h2>
                </TableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer> : <p>Loading...</p> }
      </div> 
      {donor && (
        <Drawer anchor="right" open={donor} onClose={() => setDonor(false)}>
          <div style={{ width: "30vw", padding: "1rem" }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ float: "right" }}
              onClick={() => setDonor(false)}
            >
              Close
            </Button>
            <h2>Donor Details</h2>

            <hr />
            <br />
            {Object.keys(list[index1].donators[0].user).map((key, index) => {
              if (
                key === "id" ||
                key === "roles" ||
                key === "active" ||
                key === "password"
              )
                return null;
              else {
                return (
                  <div key={index}>
                    <p style={{ fontSize: "1rem", margin: "1rem" }}>
                      <span style={{ color: "skyblue" }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)} :{" "}
                      </span>{" "}
                      {list[index1].donators[0].user[key]}
                    </p>
                  </div>
                );
              }
            })}
            <h2>Blood Details</h2>
            <hr />
            <br />
            {Object.keys(list[index1].donators[0]).map((key, index) => {
              if (
                key === "id" ||
                key === "live" ||
                key === "quantity" ||
                key === "user"
              )
                return null;
              else {
                let details = list[index1].donators[0];
                return (
                  <div key={index}>
                    <p style={{ fontSize: "1rem", margin: "1rem" }}>
                      <span style={{ color: "skyblue" }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)} :{" "}
                      </span>{" "}
                      {details[key]}
                      &nbsp;&nbsp;{" "}
                      <Tooltip
                        style={{ fontSize: "2rem" }}
                        title={
                          key === "date" ? (
                            <p style={{ fontSize: "0.8rem" }}>
                              This is the Date when the blood is donated{" "}
                            </p>
                          ) : (
                            <p style={{ fontSize: "0.8rem" }}>
                              {" "}
                              This is the expiry date which is usually 90 days
                              from donating.{" "}
                            </p>
                          )
                        }
                      >
                        <Info style={{ cursor: "pointer" }} />
                      </Tooltip>
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </Drawer>
      )}
      <Backdrop open={loading} style={{ zIndex: theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Requested;
