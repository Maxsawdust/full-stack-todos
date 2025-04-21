import { CiMenuBurger } from "react-icons/ci";

interface NavListButtonProps {
  title: string;
}

export default function NavListButton({ title }: NavListButtonProps) {
  return (
    <button className="w-full px-2 py-1 flex items-center gap-4 cursor-pointer rounded-md transition-all duration-100 hover:bg-gray-400 ">
      <CiMenuBurger />
      {title}
    </button>
  );
}
