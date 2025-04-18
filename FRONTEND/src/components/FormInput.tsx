import { useState } from "react";
import { PasswordVisibilityToggle } from "./";

type FormInputProps = {
  children: React.ReactNode;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string | undefined;
};

export default function FormInput({
  children,
  name,
  onChange,
  errorMessage,
}: FormInputProps) {
  // state to handle password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <label
      htmlFor={name}
      className={`flex flex-col ${
        errorMessage ? "text-red-500" : "text-gray-700"
      }`}>
      {errorMessage ? errorMessage : children}

      <div className="relative">
        <input
          id={name}
          type={`${
            name === "password" || name === "confirmPassword"
              ? passwordVisible
                ? "text"
                : "password"
              : "text"
          }`}
          className="w-full h-full text-xl px-1 border-2 rounded-md border-gray-200 bg-white"
          placeholder={children as string}
          onChange={onChange}
        />

        {/* displaying visibility toggle if the input is for passwords */}
        {(name === "password" || name === "confirmPassword") && (
          <PasswordVisibilityToggle
            state={[passwordVisible, setPasswordVisible]}
          />
        )}
      </div>
    </label>
  );
}
