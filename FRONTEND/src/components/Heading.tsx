type HeadingProps = {
  children: React.ReactNode;
  big?: boolean;
  small?: boolean;
};

// Heading component that allows you to specify "big", or "small" to change between three sizes
export default function Heading({ children, big, small }: HeadingProps) {
  return (
    <h1
      className={`${big ? "text-6xl" : "text-4xl"} ${
        small ? "text-2xl" : ""
      } font-semibold`}>
      {children}
    </h1>
  );
}
