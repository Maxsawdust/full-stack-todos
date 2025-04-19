import {
  FormInput,
  FormSubmitButton,
  Heading,
  SubHeading,
} from "../components";

import { useFormik } from "formik";
import { loginSchema } from "../utils/validationSchema";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    onSubmit: () => {
      // check if user exists

      // generate token

      // store details in localStorages
      const userDetails = {
        email: formik.values.email,
        password: formik.values.password,
        token: "",
      };

      localStorage.setItem("user", JSON.stringify(userDetails));

      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      // navigate to ToDos
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

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
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
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-xl text-gray-600">
              Remember me
            </label>
          </div>

          <FormSubmitButton>Log In</FormSubmitButton>
        </form>
      </div>
    </div>
  );
}
