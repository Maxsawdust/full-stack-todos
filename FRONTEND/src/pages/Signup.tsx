import { useFormik } from "formik";
import {
  FormInput,
  FormSubmitButton,
  Heading,
  SubHeading,
} from "../components";
import { signupSchema } from "../utils/validationSchema";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: () => {
      // register new user
      // navigate to login
      navigate("/login");
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

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <FormInput
            errorMessage={formik.errors.username}
            onChange={formik.handleChange}
            name="username">
            Username
          </FormInput>
          <FormInput
            errorMessage={formik.errors.email}
            onChange={formik.handleChange}
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
          <FormSubmitButton>Sign Up</FormSubmitButton>
        </form>
      </div>
    </div>
  );
}
