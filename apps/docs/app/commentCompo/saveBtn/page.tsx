import { Box, Button } from "@mui/material";
import { useController } from "react-hook-form";
export function Buttons({ control, name }: any) {
  const { field } = useController({ name, control, defaultValue: "" });

  return (
    <Button
      {...field}
      type="submit"
      variant="contained"
      color="primary"
      sx={{ mt: 3 }}
    >
      Register
    </Button>
  );
}
