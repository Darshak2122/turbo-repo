import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { useController } from "react-hook-form";

interface RadioOption {
  label: string;
  value: string;
}

interface CommonRadioButtonGroupProps {
  control: any;
  name: string;
  label: string;
  options: RadioOption[];
  error?: boolean;
  helperText?: string;
}

export function CommonRadioButtonGroup({
  control,
  name,
  label,
  options,
  error = false,
  helperText = "",
}: CommonRadioButtonGroupProps) {
  const { field } = useController({ name, control });
  const { value, onChange } = field;

  return (
    <FormControl sx={{ mt: 1 }} error={error}>
      <FormLabel sx={{ textDecoration: "underline", fontWeight: "bold" }}>
        {label} :
      </FormLabel>
      <RadioGroup row value={value} onChange={onChange}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {helperText && (
        <Typography variant="body1" style={{ color: "red" }}>
          {helperText}
        </Typography>
      )}
    </FormControl>
  );
}
