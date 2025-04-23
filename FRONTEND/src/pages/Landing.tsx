import { useEffect } from "react";
import { ImageCard, Button, Heading, SubHeading } from "../components";
import { useNavigate } from "react-router";

export default function Landing() {
  // useNavigate to handle button clicks
  const navigate = useNavigate();

  useEffect(() => {
    try {
      checkAuth();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const checkAuth = async () => {
    // try and fetch lists from api, validating the cookie
    const response = await fetch("http://localhost:5000/lists", {
      credentials: "include",
    });

    // if the response isn't okay
    if (!response.ok) {
      // check first if it's anything other than a 403, which will mean a server error
      if (response.status !== 403) {
        const data = await response.json();
        throw new Error(data);
      }

      // if it's a 403, that's fine, just return so the user can log in
      return;
    }

    // if response is fine, navigate user to dashboard
    navigate("/dashboard");
  };

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
