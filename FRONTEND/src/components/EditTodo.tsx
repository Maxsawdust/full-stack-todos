import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // update list in global store
      dispatch(updateTodo(inputValue));

      // make a PATCH request to DB
      try {
      } catch (err) {}
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
