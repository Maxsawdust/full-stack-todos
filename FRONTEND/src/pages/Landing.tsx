import { ImageCard, Button, Heading, SubHeading } from "../components";
import { useNavigate } from "react-router";

export default function Landing() {
  // useNavigate to handle button clicks
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-12 flex flex-col items-center gap-[51px] ">
      <header className="w-screen flex flex-col justify-center items-center ">
        <Heading big>Max's To-Do App</Heading>
        <SubHeading big>To-Do? More like To-DONE!</SubHeading>
      </header>

      <ImageCard />

      <div className="flex gap-30">
        <Button
          onClick={() => {
            navigate("/login");
          }}>
          Log In
        </Button>
        <Button
          onClick={() => {
            navigate("/signup");
          }}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
