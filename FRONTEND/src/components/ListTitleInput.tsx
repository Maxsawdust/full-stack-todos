import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../store/hooks/hooks";
import { setListBeingAdded, setLists } from "../store/reducers/listReducer";
import ListType from "../interfaces/ListType";

export default function ListTitleInput() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // focus the input on load
    inputRef.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 25) setInputValue(e.target.value);
    return;
  };

  // function to handle when enter is pressed
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // adding the new list to global store
      const newList: ListType = {
        title: inputValue,
        content: [],
      };

      // adding the new list to DB
      try {
        // fetch with a PATCH request to /lists
        const response = await fetch("http://localhost:5000/lists", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          // allow cookies
          credentials: "include",
          body: JSON.stringify(newList),
        });

        // if the response is not ok, throw an error
        if (!response.ok) {
          throw new Error("Failed to add list");
        }

        // Get the updated lists from the response
        const updatedLists = await response.json();

        // Update the global store with the fresh data from the server
        dispatch(setLists(updatedLists));
      } catch (err: any) {
        console.error(err);
      } finally {
        dispatch(setListBeingAdded(false));
      }
    }
  };

  // remove the input on blur
  const hideInput = () => {
    dispatch(setListBeingAdded(false));
  };

  return (
    <input
      type="text"
      ref={inputRef}
      className="w-full px-2 py-1 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={hideInput}
      placeholder="Enter list title"
      value={inputValue}
    />
  );
}
