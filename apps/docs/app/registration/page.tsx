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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Zod schema for validation
const loginSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be 2 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
  city: z
    .string({ required_error: "City is required" })
    .min(2, { message: "Please select the city" }),
  phone: z
    .string({ required_error: "Phone Number is required" })
    .regex(/^\d{10}$/, { message: "Phone must be a 10-digit number" }),
  account: z
    .string({ required_error: "Account Number is required" })
    .regex(/^\d{10,12}$/, { message: "Account must be 10-12 digits" }),
  gender: z.enum(["female", "male", "other"], {
    message: "Gender is required",
  }),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Registration = () => {
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
    if (isValid) {
      // Retrieve existing data from localStorage
      const existingData = JSON.parse(localStorage.getItem("formData") || "[]");

      // Add the new data (including selected skills)
      const updatedData = [...existingData, data];

      // Save the updated data back to localStorage
      localStorage.setItem("formData", JSON.stringify(updatedData));
      setIsSubmitted(true);

      // Reset the form fields after submission
      reset();
      // Hide alert after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  React.useEffect(() => {
    // Retrieve data from localStorage on initial load and update state
    const data = JSON.parse(localStorage.getItem("formData") || "[]");
  }, []);

  // Cities Array 
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
  ];

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
              type="number"
              margin="normal"
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
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
              error={!!errors.city}
            >
              <InputLabel>City</InputLabel>
              <Select label="City" {...register("city")}>
                {cities.map((city, index) => (
                  <MenuItem key={index} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              {errors.city && (
                <Typography variant="body2" color="error">
                  {errors.city.message}
                </Typography>
              )}
            </FormControl>

            <TextField
              fullWidth
              label="Account No."
              variant="outlined"
              margin="normal"
              type="number"
              {...register("account")}
              error={!!errors.account}
              helperText={errors.account?.message}
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
                  {...register("gender")}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  {...register("gender")}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  {...register("gender")}
                />
              </RadioGroup>
              {errors.gender && (
                <Typography variant="body1" style={{ color: "red" }}>
                  {errors.gender.message}
                </Typography>
              )}
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
                      control={
                        <Checkbox value={skill} {...register("skills")} />
                      }
                      label={skill}
                    />
                  )
                )}
              </FormGroup>
              {errors.skills && (
                <Typography variant="body1" style={{ color: "red" }}>
                  {errors.skills.message}
                </Typography>
              )}
            </FormControl>

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
        </Box>

        {isSubmitted && (
          <Alert severity="success" sx={{ mt: 3 }}>
            <Typography>Form submitted successfully!</Typography>
          </Alert>
        )}
        
      </Card>
    </Container>
  );
};

export default Registration;
