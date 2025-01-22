import { TextField, InputAdornment } from "@mui/material";
import { useController } from "react-hook-form";

interface CommonTextFieldProps {
  control: any;
  name: string;
  label: string;
  type?: string;
  error?: boolean;
  helperText?: string;
  startAdornment?: React.ReactNode;
}

export function CommonTextField({
  control,
  name,
  label,
  type = "text",
  error = false,
  helperText = "",
  startAdornment,
}: CommonTextFieldProps) {
  const { field } = useController({ name, control });
  const { onChange, value } = field;

  return (
    <TextField
      {...field}
      fullWidth
      label={label}
      variant="outlined"
      margin="normal"
      type={type}
      error={error}
      helperText={helperText}
      value={value}
      onChange={onChange}
      InputProps={startAdornment ? { startAdornment } : {}}
    />
  );
}
