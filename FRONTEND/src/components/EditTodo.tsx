import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../store/hooks/hooks";
import { setTodoBeingEdited, updateTodo } from "../store/reducers/listReducer";
import TodoType from "../interfaces/TodoType";

interface EditTodoProps {
  todo: TodoType;
}

export default function EditTodo({ todo }: EditTodoProps) {
  const [errorText, setErrorText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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

        // check if response isn't okay, and display the err message
        if (!response.ok) {
          const errorMesage = (await response.json()).message;
          // display the errorMessage for 1s
          setErrorText(errorMesage);
          setTimeout(() => {
            setErrorText("");
          }, 1000);
          throw new Error(errorMesage);
        }

        // update list in global store
        dispatch(updateTodo({ message: inputValue }));
        // get rid of the input box
        dispatch(setTodoBeingEdited(""));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const hideInput = () => {
    dispatch(setTodoBeingEdited(null));
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        className={`w-full  px-2 py-1 rounded-md bg-gray-100 focus:outline-none focus:ring-2 ${
          errorText ? "focus-ring-red-700 text-red-700" : "focus-ring-gray-700"
        }`}
        ref={inputRef}
        placeholder={todo.message}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={hideInput}
      />
      {errorText && (
        <p className="absolute w-full top-1/2 translate-y-[-50%] rleft-0 text-red-700 bg-white">
          {"error: " + errorText}
        </p>
      )}
    </div>
  );
}
