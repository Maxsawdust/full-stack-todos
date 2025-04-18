// defining props for button
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      // making it so you can overwrite the Button styling if you pass a className
      className={
        className
          ? className
          : "text-3xl py-4 px-8 rounded-4xl bg-white shadow-lg cursor-pointer | hover:bg-gray-100 hover:shadow-md transition-all duration-150"
      }
      onClick={onClick}>
      {children}
    </button>
  );
}
