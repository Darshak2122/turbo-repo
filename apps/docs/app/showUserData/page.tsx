"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

// Define the DataRow interface
interface DataRow {
  name: string;
  city: string;
  phone: string;
  account: string;
}

export default function BasicTable() {
  const [data, setData] = React.useState<DataRow[]>([]);
  const [editData, setEditData] = React.useState<DataRow | null>(null); // Store data of the row to edit
  const [formData, setFormData] = React.useState<DataRow>({
    name: "",
    city: "",
    phone: "",
    account: "",
  });

  // const router = useRouter(); // Initialize the useRouter hook

  console.log("call------data", data);

  // Fetch data from localStorage
  React.useEffect(() => {
    const getObj = JSON.parse(localStorage.getItem("formData") || "[]");
    setData(getObj);
  }, []);

  // Function to delete a row
  const deleteRow = (index: number) => {
    const newData = data.filter((_, i) => i !== index); // Remove item at index
    setData(newData);
    localStorage.setItem("formData", JSON.stringify(newData)); // Update localStorage
  };

  // Function to handle edit
  const editRow = (index: number) => {
    const selectedRow = data[index]; // Get the selected row data
    setEditData(selectedRow); // Set selected row data for editing
    setFormData({ ...selectedRow }); // Pre-fill form with data
  };

  return (
    <Box sx={{ padding: "20px 50px", marginTop: "50px", marginRight: "30px" }}>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "10px",
          marginBottom: "20px",
          color: "wheat",
          border: "1px solid wheat",
        }}
      >
        <Link href="/registration">
          <ArrowBackIcon sx={{ display: "flex", justifyContent: "center" }} />
        </Link>
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">No.</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Account</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.account}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => editRow(index)}>Edit</Button>
                  <Button onClick={() => deleteRow(index)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
