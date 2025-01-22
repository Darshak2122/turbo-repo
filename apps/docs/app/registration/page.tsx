"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container, Card, InputAdornment } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import BackButton from "../commentCompo/BackButton/page";
import { DropDown } from "../commentCompo/dropdown/page";
import CheckBox from "../commentCompo/checkBox/page";
import { Buttons } from "../commentCompo/saveBtn/page";
import { ShowDataBtn } from "../commentCompo/showDataBtn/page";
import { toast, ToastContainer } from "react-toastify";
import { CommonTextField } from "../commentCompo/textFields/page";
import Heading from "../commentCompo/heading/page";
import { CommonRadioButtonGroup } from "../commentCompo/radioBtn/page";
import { LoginFormInputs, loginSchema } from "../utils/zodValidation";
import '../commentCompo/css/main.css'

const Registration = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      account: "",
      city: "select a city",
      gender: "male",
      name: "",
      phone: "",
      skills: [],
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      return await axios.post("http://localhost:4040/users", data);
    },
    onSuccess: () => {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data: any) => {
    if (isValid) {
      mutate(data);
      toast.success("Form submitted successfully");
      reset({
        account: "",
        city: "",
        gender: "male",
        name: "",
        phone: "",
        skills: [],
      });
    }
  };

  return (
    <Container>
      <ToastContainer autoClose={2000} />
      <BackButton href="/" />
      <Card sx={{ borderRadius: "20px" }}>
        <Box className="mainBox">
          <Heading />
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 2,
              width: "100%",
              border: "1px solid",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <CommonTextField
              control={control}
              label="Name"
              name="name"
              type="string"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <CommonTextField
              control={control}
              type="number"
              label="Phone"
              name="phone"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              startAdornment={
                <InputAdornment position="start">+91</InputAdornment>
              }
            />
            <DropDown name="city" control={control} />
            <CommonTextField
              control={control}
              label="Account No."
              name="account"
              type="number"
              error={!!errors.account}
              helperText={errors.account?.message}
            />
            <CommonRadioButtonGroup
              control={control}
              label="Gender"
              name="gender"
              error={!!errors.gender}
              helperText={errors.gender?.message}
              options={[
                { label: "Female", value: "female" },
                { label: "Male", value: "male" },
                { label: "Other", value: "other" },
              ]}
            />
            <br />
            <CheckBox name="skills" control={control} />
            <Box className="boxBtn">
              <Buttons name="submit" control={control} />
              <ShowDataBtn />
            </Box>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default Registration;
