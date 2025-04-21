type SubHeadingProps = {
  children: React.ReactNode;
  big?: boolean;
  small?: boolean;
};

// SubHeading component that allows you to specify "big", or "small" to change between three sizes
export default function SubHeading({ children, big, small }: SubHeadingProps) {
  return (
    <h2
      className={`${big ? "text-[40px]" : "text-[30px]"} ${
        small ? "text-[10px]" : ""
      } text-gray-800 italic`}>
      {children}
    </h2>
  );
}
