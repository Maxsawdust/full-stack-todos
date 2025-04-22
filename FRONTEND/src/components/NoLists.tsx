import { Heading, SubHeading } from "./";
import listImage from "../assets/images/making-a-list.png";

export default function NoLists() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Heading big>Looks like you don't have any lists!</Heading>
      <SubHeading big>
        Press the plus icon in the sidebar to add a new list!
      </SubHeading>

      <img src={listImage} alt="making a list" />
    </div>
  );
}
