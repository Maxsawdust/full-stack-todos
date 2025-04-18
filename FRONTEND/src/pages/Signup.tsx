import { useFormik } from "formik";
import {
  FormInput,
  FormSubmitButton,
  Heading,
  SubHeading,
} from "../components";
import { signupSchema } from "../utils/validationSchema";
import { useNavigate } from "react-router";
import { useState } from "react";
import UserSignUp from "../interfaces/userSignUp";

export default function Signup() {
  const [signUpError, setSignUpError] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: async () => {
      try {
        // get users from DB
        const allUsers = await (
          await fetch("http://localhost:5000/users")
        ).json();

        const username = formik.values.username;
        const email = formik.values.email.toLowerCase();

        // displaying err message if username taken
        if (allUsers.find((user: UserSignUp) => user.username === username)) {
          formik.errors.username = "Oops, that username is already taken!";
          return;
        }
        // displaying err message if email taken
        if (allUsers.find((user: UserSignUp) => user.email === email)) {
          formik.errors.email =
            "Wait a minute, looks like that email is taken!";
          return;
        }

        // if there is no existing user with these details, add the user to DB
        const response = await fetch("http://localhost:5000/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formik.values),
        });

        if (!response.ok) {
          throw new Error("Failed to sign up.");
        }

        // clear error text
        setSignUpError("");
        // navigate to login
        navigate("/login");
      } catch (err: any) {
        setSignUpError("Sorry, something's wrong on our end!");
        console.error(err);
      }
    },

    validateOnBlur: false,
    validateOnChange: false,

    validationSchema: signupSchema,
  });

  return (
    <div className="page">
      <div className="w-80 h-3/5 flex flex-col gap-6">
        <header className="">
          <Heading>Sign Up</Heading>
          <SubHeading>Productivity starts here</SubHeading>
        </header>

        <div className="h-[2px] bg-gray-400" />

        <form
          className="flex flex-col gap-4 relative"
          onSubmit={formik.handleSubmit}>
          <FormInput
            errorMessage={formik.errors.username}
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldError("username", "");
            }}
            name="username">
            Username
          </FormInput>
          <FormInput
            errorMessage={formik.errors.email}
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldError("email", "");
            }}
            name="email">
            Email
          </FormInput>
          <FormInput
            errorMessage={formik.errors.password}
            onChange={formik.handleChange}
            name="password">
            Password
          </FormInput>
          <FormInput
            errorMessage={formik.errors.confirmPassword}
            onChange={formik.handleChange}
            name="confirmPassword">
            Confirm Password
          </FormInput>

          <div className=" mt-6 h-[2px] bg-gray-400" />

          <div className="absolute bottom-16 left-1/2 translate-x-[-50%] text-red-500 font-semibold">
            {signUpError}
          </div>

          <FormSubmitButton>Sign Up</FormSubmitButton>
        </form>
      </div>
    </div>
  );
}
