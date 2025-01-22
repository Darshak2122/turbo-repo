import {z} from 'zod'
export function getErrorMessage(error: any) {
    if (error && error.message) {
      return error.message;
    }
    return "";
  }


  export const loginSchema = z.object({
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
  
  export type LoginFormInputs = z.infer<typeof loginSchema>;