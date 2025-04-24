import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../store/hooks/hooks";
import { setTodoBeingAdded, setTodos } from "../store/reducers/listReducer";
import TodoType from "../interfaces/TodoType";

interface TodoInputTypes {
  listId: string;
}

export default function TodoInput({ listId }: TodoInputTypes) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // ref to grab input element
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // focus input on load
    inputRef.current?.focus();
  }, []);

  // control input based on react state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // submit input when enter pressed
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // add a todo
      try {
        // creating a new todo
        const newTodo: TodoType = {
          message: inputValue,
          completed: false,
        };

        // send a PATCH request to api
        const response = await fetch(`http://localhost:5000/lists/${listId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(newTodo),
        });

        // throw an err if response is bad
        if (!response.ok) {
          const errMessage = (await response.json()).message;
          // check if response is 403, forbidden
          if (response.status === 403) {
            // show an error message on screen
            setErrorMessage(errMessage);
          }

          throw new Error(errMessage);
        }

        // clear error message
        setErrorMessage("");

        // get the new list from response
        const updatedList = await response.json();
        console.log(updatedList);

        dispatch(setTodos(updatedList));

        // close input
        dispatch(setTodoBeingAdded(false));
      } catch (err: any) {
        console.error(err.message);
      }
    }
  };

  // function to get rid of input on blur
  const hideInput = () => {
    dispatch(setTodoBeingAdded(false));
  };

  return (
    <div>
      <input
        type="text"
        className={`w-2/3 px-2 py-1 self-start rounded-md bg-gray-100 focus:outline-none focus:ring-2 ${
          errorMessage ? "focus:ring-red-700" : "focus:ring-gray-700"
        }`}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={hideInput}
        ref={inputRef}
        placeholder="Write down a task you need to complete"
      />

      {errorMessage && <p className="text-red-700">{errorMessage}</p>}
    </div>
  );
}
