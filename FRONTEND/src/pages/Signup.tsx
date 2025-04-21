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
import DataType from "../interfaces/DataType";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { setLoading } from "../store/reducers/loadingReducer";

export default function Signup() {
  const [signUpError, setSignUpError] = useState("");
  // loading state from store
  const isLoading = useAppSelector((state) => state.loadingReducer).isLoading;

  const navigate = useNavigate();

  // getting dispatch
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: async () => {
      // initialise Loading state
      dispatch(setLoading(true));
      try {
        // send a POST request to the DB
        const response = await fetch("http://localhost:5000/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formik.values),
        });

        // request gets intercepted by middleware to check if user already exists in DB
        const data: DataType = await response.json();

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            // assign the error message to the corresponding input box
            formik.setFieldError(data.type!, data.message);
            return;
          }
          // if status is not 400, then it'll be a server err and needs to be thrown
          throw new Error(data.message);
        }

        // navigate to login
        navigate("/login");
      } catch (err: any) {
        setSignUpError("Sorry, something's wrong on our end!");
        console.error(err);
      } finally {
        // clear error text
        setSignUpError("");
        dispatch(setLoading(false));
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

          <div className="w-[200%] text-center absolute bottom-16 left-1/2 translate-x-[-50%] text-red-500 font-semibold">
            {signUpError}
          </div>

          <FormSubmitButton {...(isLoading && { bgColor: "bg-green-500" })}>
            {isLoading ? "Signing up..." : "Sign Up"}
          </FormSubmitButton>
        </form>
      </div>
    </div>
  );
}
