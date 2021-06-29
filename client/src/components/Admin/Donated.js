import React, { useEffect, useState } from "react";
import {
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Drawer,
} from "@material-ui/core";
import axios from "axios";

import theme from "../../theme/theme";

function Donated() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [index1, setIndex1] = useState(0);
  const [donor, setDonor] = useState(false);

  async function getDonatedList() {
    setLoading(true);
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/getLiveBlood`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("bb_auth_token")}`,
        },
      });
      if (result.status === 200) {
        setList(result.data);
        setLoading(false);
      }
    } catch (err) {
      window.alert(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getDonatedList();
  }, []);

  return (
    <>
      <div style={{ width: "90%", margin: "auto" }}>
        <h2>List of All Donated Data</h2>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ background: "#fff" }}>
              <TableRow>
                <TableCell style={{ color: "#000" }}>S.No</TableCell>
                <TableCell style={{ color: "#000" }}>Donated Date</TableCell>
                <TableCell style={{ color: "#000" }}>Quantity</TableCell>
                <TableCell style={{ color: "#000" }}>Expiry Date </TableCell>
                <TableCell style={{ color: "#000" }}>Donated / Hold </TableCell>
                <TableCell style={{ color: "#000" }}>Donor </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length > 0 ? (
                list.map((row, index) => (
                  <TableRow key={index} hover style={{ cursor: "pointer" }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.expiryDate}</TableCell>
                    <TableCell>
                      {" "}
                      <Chip
                        style={{ background: row.live ? "green" : "red" }}
                        label={row.live ? "Hold" : "Donated"}
                      />
                    </TableCell>
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
        </TableContainer>

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
              {Object.keys(list[index1].user).map((key, index) => {
                if (
                  key === "id" ||
                  key === "roles" ||
                  key === "password" ||
                  key === "active"
                )
                  return null;
                else {
                  return (
                    <div key={index}>
                      <p style={{ fontSize: "1rem", margin: "1rem" }}>
                        <b style={{ color: "skyblue" }}>
                          {key.charAt(0).toUpperCase() + key.slice(1)} :{" "}
                        </b>{" "}
                        {list[index1].user[key]}
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
      </div>
    </>
  );
}

export default Donated;
