import { useEffect } from "react";
import NavListButton from "./buttons/NavListButton";
import { IoMdAdd } from "react-icons/io";
import { ListTitleInput } from "./";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { setListBeingAdded, setLists } from "../store/reducers/listReducer";

export default function NavBar() {
  // list state from store
  const lists = useAppSelector((state) => state.listReducer.lists);
  const listBeingAdded = useAppSelector(
    (state) => state.listReducer.listBeingAdded
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    try {
      // fetch the lists from DB
      const response = await fetch("http://localhost:5000/lists/", {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch lists");
      }

      // set the lists array to global state
      dispatch(setLists(data));
    } catch (err) {
      console.error(err);
    }
  };

  const addList = async () => {
    // display the input
    dispatch(setListBeingAdded(true));
  };

  return (
    <div className="w-50 py-20 px-5 h-full flex flex-col bg-[#d4d4d4] shadow-xl">
      {/* LOG OUT BUTTON */}
      <div className="flex items-center gap-4">
        <p className="text-2xl font-semibold text-gray-700 underline">
          Your Lists
        </p>
        <button
          onClick={addList}
          className="mt-1 relative cursor-pointer rounded-4xl hover:bg-gray-400 transition-all duration-100 group">
          <IoMdAdd className="h-6 w-6  fill-gray-700" />
          <span className="w-fit text-nowrap px-2 py-1 absolute top-[-4px] left-10 bg-gray-400 rounded-lg scale-0 group-hover:scale-100 transition-all duration-100 ease-in">
            ADD LIST
          </span>
        </button>
      </div>
      <div className="py-10 flex flex-col gap-3">
        {lists.map((list) => {
          return <NavListButton title={list.title} />;
        })}

        {listBeingAdded && <ListTitleInput />}
      </div>
    </div>
  );
}
