interface TodoCardControlProps {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function TodoCardControl({
  children,
  label,
  onClick,
  style,
}: TodoCardControlProps) {
  return (
    <button
      className="relative h-8 w-8 flex justify-center items-center cursor-pointer rounded-md bg-gray-300 shadow-lg hover:bg-gray-400 hover:shadow-md transition-all duration-100 group"
      onClick={onClick}
      {...(style && { style: { ...style } })}>
      {children}

      <span className=" w-[300%] absolute bottom-[-1.6rem] bg-gray-300 rounded-md scale-0 shadow-md group-hover:scale-100 transition-all duration-100">
        {label}
      </span>
    </button>
  );
}
