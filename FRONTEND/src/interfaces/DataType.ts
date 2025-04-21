import UserSignUp from "./userSignUp";

export default interface DataType {
  message: string;
  type?: keyof UserSignUp;
}
