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
  AppBar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
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
  Toolbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TransitionProps } from "@mui/material/transitions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextFields } from "@repo/sheradcompo";
interface DataRow {
  name: string;
  city: string;
  phone: string;
  account: string;
  gender: string;
  skills: string[];
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

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const items = await axios.get("http://localhost:4040/users");
      return items.data;
    },
  });

  const client = useQueryClient();

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

  const handleClickOpens = () => {
    setOpenEdit(true);
  };

  const handleCloses = () => {
    setOpenEdit(false);
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
        <TextFields />
      </Box>
      <br/>
      {/* Table for show user data */}
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
            {data?.length &&
              data?.map((row: any, index: number) => (
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
                    <Button onClick={handleClickOpens}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleClickOpen(row?.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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
        sx={{backgroundColor:"#F2F7F2"}}
      >
        <AppBar sx={{ position: "relative",backgroundColor:"#C8A2C8"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloses}
              aria-label="close"
            >
              X
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Update Value
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloses}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding="50px"
        >
          <Typography variant="h4" gutterBottom>
            Update User Data
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2, width: "100%" }}
          >
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              // {...register("name")}
              // error={!!errors.name}
              // helperText={errors.name?.message}
            />

            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              type="number"
              margin="normal"
              // {...register("phone")}
              // error={!!errors.phone}
              // helperText={errors.phone?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />

            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              // error={!!errors.city}
            >
              <InputLabel>City</InputLabel>
              <Select>
                {/* value={watch('city')} label="City" {...register("city")} */}
                <MenuItem value="" disabled>
                  Select a city
                </MenuItem>
                {[
                  "New York",
                  "Los Angeles",
                  "Chicago",
                  "Houston",
                  "Phoenix",
                  "Philadelphia",
                ].map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              {/* {errors.city && (
                <Typography variant="body2" color="error">
                  {errors.city.message}
                </Typography>
              )} */}
            </FormControl>

            <TextField
              fullWidth
              label="Account No."
              variant="outlined"
              margin="normal"
              type="number"
              // {...register("account")}
              // error={!!errors.account}
              // helperText={errors.account?.message}
            />

            <FormControl sx={{ mt: 1 }}>
              <FormLabel
                sx={{ textDecoration: "underline", fontWeight: "bold" }}
                id="demo-radio-buttons-group-label"
              >
                Gender :-
              </FormLabel>
              <RadioGroup row aria-labelledby="demo-radio-buttons-group-label">
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  // {...register("gender")}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  // {...register("gender")}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  // {...register("gender")}
                />
              </RadioGroup>
              {/* {errors.gender && (
                <Typography variant="body1" style={{ color: "red" }}>
                  {errors.gender.message}
                </Typography>
              )} */}
            </FormControl>

            <br />

            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <FormLabel
                sx={{ textDecoration: "underline", fontWeight: "bold" }}
                component="legend"
              >
                Skills
              </FormLabel>

              <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
                {["JavaScript", "React", "TypeScript", "Node.js"].map(
                  (skill) => (
                    <FormControlLabel
                      key={skill}
                      control={<Checkbox value={skill} />}
                      label={skill}
                    />
                    // {...register("skills")}
                  )
                )}
              </FormGroup>
              {/* {errors.skills && (
                <Typography variant="body1" style={{ color: "red" }}>
                  {errors.skills.message}
                </Typography>
              )} */}
            </FormControl>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
