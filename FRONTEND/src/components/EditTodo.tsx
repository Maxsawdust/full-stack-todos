import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../store/hooks/hooks";
import { setTodoBeingEdited, updateTodo } from "../store/reducers/listReducer";
import TodoType from "../interfaces/TodoType";

interface EditTodoProps {
  todo: TodoType;
}

export default function EditTodo({ todo }: EditTodoProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // update list in global store
      dispatch(updateTodo(inputValue));

      // make a PATCH request to DB
      try {
        const response = await fetch(
          `http://localhost:5000/lists/editTodo/${todo._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            // specify that it's a message so that the data is applied correctly
            body: JSON.stringify({
              message: inputValue,
            }),
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorMesage = (await response.json()).message;
          throw new Error(errorMesage);
        }
      } catch (err) {
        console.error(err);
      } finally {
        // after all that's done, get rid of the input box
        dispatch(setTodoBeingEdited(""));
      }
    }
  };

  const hideInput = () => {
    dispatch(setTodoBeingEdited(null));
  };

  return (
    <input
      type="text"
      className="w-full  px-2 py-1 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus-ring-gray-700"
      ref={inputRef}
      placeholder={todo.message}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={hideInput}
    />
  );
}
