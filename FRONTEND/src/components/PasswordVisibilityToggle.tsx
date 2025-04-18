import { EyeIcon, EyeSlashIcon } from "./";

// defining the shape of props
interface PasswordVisibilityToggleProps {
  state: [boolean, (value: boolean) => void];
}

export default function PasswordVisibilityToggle({
  state,
}: PasswordVisibilityToggleProps) {
  // accessing state variables from props
  const [passwordVisible, setPasswordVisible] = state;

  return (
    //
    <button
      tabIndex={-1}
      type="button"
      // toggling the visibility state
      onClick={() => setPasswordVisible(!passwordVisible)}
      className="h-6 w-6 grid place-content-center absolute top-1/2 right-2 translate-y-[-50%] rounded-4xl cursor-pointer">
      {passwordVisible ? <EyeIcon /> : <EyeSlashIcon />}
    </button>
  );
}
