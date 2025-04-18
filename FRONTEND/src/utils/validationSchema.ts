import * as Yup from "yup";

export const signupSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .matches(/^[a-z0-9_\-]+$/i, "Username must only include valid characters."),

  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .matches(/^(?=.*[A-Z])/, "Password must contain a capital letter")
    .matches(/^(?=.*[0-9])/, "Password must contain a number")
    .matches(/^(?=.*[!@#$%^&*])/, "Password must contain a special character")
    .matches(/^(?=.*[a-z])/, "Password must contain a lowercase letter"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),

  password: Yup.string().required("Password is required"),
});
