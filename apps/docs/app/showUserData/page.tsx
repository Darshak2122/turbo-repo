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
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// Define the DataRow interface
interface DataRow {
  name: string;
  city: string;
  phone: string;
  account: string;
  gender: string;
  skills: string[];
}

export default function BasicTable() {
  const [formData, setFormData] = React.useState<DataRow>({
    name: "",
    city: "",
    phone: "",
    account: "",
    gender: "",
    skills: [],
  });

  // Fetch data from localStorage
  // React.useEffect(() => {
  //   const getObj = JSON.parse(localStorage.getItem("formData") || "[]");
  //   setData(getObj);
  // }, []);


  const { data } = useQuery({
    queryKey :['users'],
    queryFn  : async ()=>{
      const items = await axios.get('http://localhost:4040/users')
      return items.data
    }
  })
  const client = useQueryClient()
  const {mutate} = useMutation({
    mutationFn : async (id)=>{
      const items = await axios.delete(`http://localhost:4040/users/${id}`)
      return items.data
    },
    onSuccess : () => client.invalidateQueries({
      queryKey : ['users']
    })
  })
  


  // // Function to delete a row
  // const deleteRow = (index: number) => {
  //   const newData = data.filter((_, i) => i !== index);
  //   setData(newData);
  //   // Update localStorage
  //   localStorage.setItem("formData", JSON.stringify(newData));
  // };

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
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Account</TableCell>
              <TableCell align="center">Skills</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length && data?.map((row:any, index:number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="center">{row.city}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.account}</TableCell>
                <TableCell align="center">
                  {row.skills.join(", ")}
                </TableCell>
                <TableCell align="center">
                  <Button>Edit</Button>
                  <Button onClick={()=>mutate(row?.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
