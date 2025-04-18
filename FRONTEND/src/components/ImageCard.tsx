import productivityImage from "../assets/images/productivity.jpg";
import { Heading, SubHeading } from "./";

export default function ImageCard() {
  return (
    <div className="w-300 h-119.75 p-16 flex justify-center items-center gap-12 bg-white">
      <img
        src={productivityImage}
        alt="being productive"
        className="w-121 h-87.5 object-cover shadow-lg"
      />
      <div className="w-121 h-87.5 flex flex-col gap-6">
        <div>
          <Heading>Find your mojo</Heading>
          <SubHeading>The best way to stay productive</SubHeading>
        </div>
        <p className="text-gray-800">
          Stay organized and boost your productivity with our intuitive to-do
          list app. Track your tasks, and celebrate your accomplishments as you
          check off items one by one. Whether you're managing work projects or
          personal goals, our app helps you maintain focus and achieve more each
          day.
        </p>
      </div>
    </div>
  );
}
