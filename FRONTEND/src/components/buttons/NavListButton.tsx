import { CiMenuBurger } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import ListType from "../../interfaces/ListType";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { setLists } from "../../store/reducers/listReducer";

interface NavListButtonProps {
  list: ListType;
}

export default function NavListButton({ list }: NavListButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const lists = useAppSelector((state) => state.listReducer.lists);

  const displayList = () => {
    navigate(`/dashboard/${list._id}`);
  };

  const deleteList = async () => {
    try {
      // make a request to the DELETE route in listRoutes
      const response = await fetch(`http://localhost:5000/lists/${list._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("failed to delete list");
      }

      // handle frontend state update to avoid fetching the lists again
      dispatch(setLists(lists.filter((l) => l._id !== list._id)));
    } catch (err: any) {
      console.error(`error: ${err.message}`);
    }
  };

  return (
    <button
      onClick={displayList}
      className=" w-full px-2 py-1 flex items-center justify-between gap-4 text-nowrap cursor-pointer rounded-md transition-all duration-100 hover:bg-gray-400"
      // inline style depending on pathname
      style={
        location.pathname === `/dashboard/${list._id}`
          ? { backgroundColor: "#99a1af" }
          : {}
      }>
      <CiMenuBurger className="" />
      {list.title}
      <div className=" group relative cursor-pointer">
        <TiDelete
          onClick={deleteList}
          className=" h-6 w-6 hover:fill-white transition-all duration-100"
        />
        <span className="w-fit text-nowrap px-2 py-[2px] absolute top-0 left-10 rounded-lg bg-gray-400 scale-0 group-hover:scale-100 transition-all duration-100 ">
          Delete list
        </span>
      </div>
    </button>
  );
}
