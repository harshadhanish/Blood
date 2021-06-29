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
} from "@material-ui/core";
import theme from "../../theme/theme";
function Donated(props) {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);

  async function getRequestedList() {
    let result;
    try {
      result = await axios({
        url: `${process.env.REACT_APP_URL}/GetDonatedDetailByUser?id=${props.user.id}`,
        method: "get",
      });

      if (result.status === 200) {
        console.log(result.data);
        setList(result.data);
        setLoad(true);
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
       {load ?  <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ background: "#fff" }}>
              <TableRow>
                <TableCell style={{ color: "#000" }}>S.No</TableCell>
                <TableCell style={{ color: "#000" }}>Donated Date</TableCell>
                <TableCell style={{ color: "#000" }}>Quantity</TableCell>
                <TableCell style={{ color: "#000" }}>Expiry Date </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.length > 0 ? (
                list.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    style={{ cursor: "pointer" }} 
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.expiryDate}</TableCell>
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
      <Backdrop open={loading} style={{ zIndex: theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default Donated;
