import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useController } from "react-hook-form";
export function DropDown({ control, name}: any) {
  const { field } = useController({ name, control, defaultValue: "" });


  const { onChange, value, } = field;

  function handleChangeCity(value: any): void {
    onChange(value);
  }

  const cities = [
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
  ];

  return (
    <FormControl
      {...field}
      fullWidth
      variant="outlined"
      margin="normal"
    >
      <InputLabel>City</InputLabel>
      <Select
        label="City"
        value={value}
        onChange={(e) => handleChangeCity(e.target.value)}
      >
        {cities.map((city, index) => (
          <MenuItem key={index} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
