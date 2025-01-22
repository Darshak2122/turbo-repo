import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useController} from 'react-hook-form'
export function TextFields({control,name}:any) {

  const {field} = useController({name,control,defaultValue:""})
 
  const {onChange,value} = field

  function handleSearchChange(value: any): void {
    onChange(value)
  }

  return (
    <Box sx={{ backgroundColor: "white" }}>
      <TextField
        {...field}
        value={value}
        fullWidth
        placeholder="Search by City..."
        onChange={(e:any)=>handleSearchChange(e.target.value)}
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