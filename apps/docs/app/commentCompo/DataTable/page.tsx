// components/DataTable.tsx
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, CircularProgress } from "@mui/material";

interface DataRow {
  id: number;
  name: string;
  city: string;
  phone: string;
  account: string;
  gender: string;
  skills: string[];
}

interface DataTableProps {
  data: DataRow[] | undefined;
  isLoading: boolean;
  onEdit: (user: DataRow) => void;
  onDelete: (id: number) => void;
  onSearch: (search: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  isLoading,
  onEdit,
  onDelete,
  onSearch,
}) => {
  return (
    <Box sx={{ padding: "20px 50px", marginTop: "50px", marginRight: "30px" }}>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "474px", overflow: "auto" }}
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <CircularProgress size="3rem" />
          </Box>
        ) : data?.length ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "aqua" }}>
                <TableCell align="left" sx={{ fontWeight: 900 }}>
                  No.
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 900 }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 900 }}>
                  City
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 900 }}>
                  Phone
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 900 }}>
                  Gender
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 900 }}>
                  Account
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 900 }}>
                  Skills
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 900 }}>
                  Action
                </TableCell>
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
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.account}</TableCell>
                  <TableCell align="center">{row.skills.join(", ")}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => onEdit(row)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => onDelete(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box sx={{ textAlign: "center", padding: "50px" }}>No data found</Box>
        )}
      </TableContainer>
    </Box>
  );
};

export default DataTable;
