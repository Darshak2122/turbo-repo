import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
export function TextFields() {
  return (
    <Box sx={{ backgroundColor: "white" }}>
      <TextField
        fullWidth
        placeholder="Search by City..."
        // onChange={""}
        // value={""}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton aria-label="description for action">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}