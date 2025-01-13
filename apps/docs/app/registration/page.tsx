"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Card,
  Alert,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Zod schema for validation
const loginSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name is must be 2 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
  city: z
    .string({ required_error: "City is required" })
    .min(2, { message: "City is must be at 2 characters" })
    .max(50, { message: "City name must be less than 50 characters" }),
  phone: z
    .string({ required_error: "Phone Number is required" })
    .regex(/^\d{10}$/, { message: "Phone must be a 10-digit number" }),
  account: z
    .string({ required_error: "Account Number is required" })
    .regex(/^\d{10,12}$/, { message: "Account must be 10-12 digits" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Registration = () => {
  const [savedData, setSavedData] = useState<LoginFormInputs[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    // Only proceed if the form is valid
    if (isValid) {
      // Retrieve existing data from localStorage
      const existingData = JSON.parse(localStorage.getItem("formData") || "[]");

      // Add the new data to the array
      const updatedData = [...existingData, data];

      // Save the updated array back to localStorage
      localStorage.setItem("formData", JSON.stringify(updatedData));

      // Update the state with the saved data
      setSavedData(updatedData);
      setIsSubmitted(true);

      // Clear input fields
      reset();

      // Hide alert after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  // Load saved data from localStorage on component mount
  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData") || "[]");
    setSavedData(data);
  }, []);

  return (
    <Container>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "10px",
          marginBottom: "30px",
          color: "wheat",
          marginTop: "20px",
          border: "1px solid wheat",
        }}
      >
        <Link href="/">
          <ArrowBackIcon sx={{ display: "flex", justifyContent: "center" }} />
        </Link>
      </Button>
      <Card>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding="50px"
        >
          <Typography variant="h4" gutterBottom>
            Registration
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2, width: "100%" }}
          >
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              margin="normal"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              margin="normal"
              {...register("city")}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
            <TextField
              fullWidth
              label="Account No."
              variant="outlined"
              margin="normal"
              {...register("account")}
              error={!!errors.account}
              helperText={errors.account?.message}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Register
              </Button>
              <Link
                href="/showUserData"
                style={{
                  marginTop: "30px",
                  border: "1px solid black",
                  padding: "8px 10px",
                  borderRadius: "8px",
                }}
              >
                Show Users
              </Link>
            </Box>
          </Box>
          {isSubmitted && (
            <Alert severity="success" sx={{ mt: 3 }}>
              <Typography>Form submitted successfully!</Typography>
            </Alert>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default Registration;
