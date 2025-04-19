interface FormSubmitButtonProps {
  children: React.ReactNode;
  bgColor?: string;
}

export default function FormSubmitButton({
  children,
  bgColor,
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      data-testid={children}
      className={`mt-10 text-xl py-2 rounded-xl ${
        bgColor ? bgColor : "bg-white"
      } shadow-lg cursor-pointer | hover:${
        bgColor ? bgColor : "bg-gray-100"
      } hover:shadow-md transition-all duration-150`}>
      {children}
    </button>
  );
}
