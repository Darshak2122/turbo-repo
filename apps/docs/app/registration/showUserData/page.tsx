"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slide,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  FormGroup,
  Checkbox,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TransitionProps } from "@mui/material/transitions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { TextFields } from "@repo/sheradcompo";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface DataRow {
  name: string;
  city: string;
  phone: string;
  account: string;
  gender: string;
  skills: string[];
  id: number;
}

interface Search {
  search: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicTable() {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [editData, setEditData] = React.useState<DataRow | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const items = await axios.get("http://localhost:4040/users");
      return items.data;
    },
  });

  // shered-component values
  const { control, watch } = useForm<Search>({
    defaultValues: {
      search: "",
    },
  });

  const client = useQueryClient();

  // filter data
  const SearchCity = watch("search");

  const filteredData = SearchCity
    ? data?.filter((row: DataRow) =>
        row.city.toLowerCase().includes(SearchCity.toLowerCase())
      )
    : data;

  // data delete by id
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      const items = await axios.delete(`http://localhost:4040/users/${id}`);
      return items.data;
    },
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: ["users"],
      }),
  });

  const handleClickOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      mutate(selectedId);
      setOpen(false);
      setSelectedId(null);
    }
  };

  const handleClickOpens = (user: DataRow) => {
    setEditData(user);
    setOpenEdit(true);
  };

  const handleCloses = () => {
    setOpenEdit(false);
    setEditData(null);
  };

  // edit function
  const handleUpdateUser = async () => {
    if (editData) {
      await axios.put(`http://localhost:4040/users/${editData.id}`, editData);
      client.invalidateQueries({ queryKey: ["users"] });
      setOpenEdit(false);
      setEditData(null);
    }
  };

  const handleChange = (e: any) => {
    if (editData) {
      const { name, value } = e.target;
      setEditData((prev) => ({ ...prev!, [name]: value }));
    }
  };

  const handleSkillsChange = (skill: string) => {
    if (editData) {
      const skills = editData.skills.includes(skill)
        ? editData.skills.filter((s) => s !== skill)
        : [...editData.skills, skill];
      setEditData({ ...editData, skills });
    }
  };

  return (
    <Box sx={{ padding: "20px 50px", marginTop: "50px", marginRight: "30px" }}>
      <Box>
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
        <TextFields name="search" control={control} />
      </Box>
      <br />
      {/* Table for show user data */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "474px", overflow: "auto" }}
      >
        {filteredData?.length ? (
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
              {filteredData?.map((row: DataRow, index: number) => (
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
                    <Button onClick={() => handleClickOpens(row)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleClickOpen(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {isLoading ? (
              <Box sx={{ margin: "25px" }}>
                <CircularProgress size="3rem" />
              </Box>
            ) : (
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGTuPzdWh2i-w2yysQxaTg1lS73dJGcPkNFA&s"
                alt="No data found"
                width={100}
                height={100}
                style={{ margin: "25px" }}
              />
            )}
          </Box>
        )}
      </TableContainer>

      {/* item delete Dialog Box */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Are you sure you want to delete this item?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Item Update Dialog Box */}
      <Dialog
        fullScreen
        open={openEdit}
        onClose={handleCloses}
        TransitionComponent={Transition}
        sx={{ backgroundColor: "#F2F7F2" }}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#C8A2C8" }}>
          <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloses}
              aria-label="close"
              sx={{ backgroundColor: "#34495e",width:"45px" }}
            >
              X
            </IconButton>
            <Button
              autoFocus
              color="inherit"
              onClick={handleUpdateUser}
              sx={{ backgroundColor: "#34495e" }}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding="50px"
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textDecoration: "underline", fontWeight: "bold" }}
          >
            Update User Data
          </Typography>
          <Box component="form" sx={{ mt: 2, width: "60%",border:"1px solid",padding:"30px 40px",borderRadius:"10px" }}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              name="name"
              value={editData?.name || ""}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              type="number"
              margin="normal"
              name="phone"
              value={editData?.phone || ""}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>City</InputLabel>
              <Select
                value={editData?.city || ""}
                onChange={handleChange}
                name="city"
              >
                <MenuItem value="" disabled>
                  Select a city
                </MenuItem>
                {[
                  "Ahmedabad",
                  "Anand",
                  "Banaskantha",
                  "Bharuch",
                  "Bhavnagar",
                  "Jamnagar",
                  "Junagadh",
                  "Kutch",
                  "Kheda",
                  "Narmada",
                  "Navsari",
                  "Patan",
                  "Panchmahal",
                  "Porbandar",
                  "Surendranagar",
                  "Surat",
                ].map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Account No."
              variant="outlined"
              margin="normal"
              type="number"
              name="account"
              value={editData?.account || ""}
              onChange={handleChange}
            />

            <FormControl sx={{ mt: 1 }}>
              <FormLabel
                sx={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                Gender
              </FormLabel>
              <RadioGroup
                row
                value={editData?.gender || ""}
                onChange={handleChange}
                name="gender"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <FormLabel
                sx={{ textDecoration: "underline", fontWeight: "bold" }}
              >
                Skills
              </FormLabel>
              <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                {["JavaScript", "React", "TypeScript", "Node.js"].map(
                  (skill) => (
                    <FormControlLabel
                      key={skill}
                      control={
                        <Checkbox
                          checked={editData?.skills.includes(skill)}
                          onChange={() => handleSkillsChange(skill)}
                        />
                      }
                      label={skill}
                    />
                  )
                )}
              </FormGroup>
            </FormControl>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
