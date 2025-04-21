import {
  FormInput,
  FormSubmitButton,
  Heading,
  SubHeading,
} from "../components";

import { useFormik } from "formik";
import { loginSchema } from "../utils/validationSchema";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    onSubmit: async () => {
      try {
        // fetch the login route
        const response = await fetch("http://localhost:5000/users/login", {
          method: "POST",
          body: JSON.stringify(formik.values),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        // parse response
        const data = await response.json();

        // if response isn't ok, throw an error to display the message
        if (!response.ok) {
          throw new Error(data.message);
        }

        navigate("/dashboard");
      } catch (err: any) {
        setLoginError(err.message);
        console.error(err);
        return;
      }
    },

    validateOnBlur: false,
    validateOnChange: false,

    validationSchema: loginSchema,
  });
  return (
    <div className="page">
      <div className="w-80 h-3/5 flex flex-col gap-6">
        <header className="">
          <Heading>Log In</Heading>
          <SubHeading>Almost there!</SubHeading>
        </header>

        <div className="h-[2px] bg-gray-400" />

        <form
          className="flex flex-col gap-4 relative"
          onSubmit={formik.handleSubmit}>
          <FormInput
            name="email"
            onChange={formik.handleChange}
            errorMessage={formik.errors.email}>
            Email
          </FormInput>
          <FormInput
            name="password"
            onChange={formik.handleChange}
            errorMessage={formik.errors.password}>
            Password
          </FormInput>

          <div className="h-[2px] mt-6 bg-gray-400" />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              onChange={formik.handleChange}
            />
            <label htmlFor="remember" className="text-xl text-gray-600">
              Remember me
            </label>
          </div>

          <div className="w-[200%] text-center absolute bottom-16 left-1/2 translate-x-[-50%] text-red-500 font-semibold">
            {loginError}
          </div>

          <FormSubmitButton>Log In</FormSubmitButton>
        </form>
      </div>
    </div>
  );
}
