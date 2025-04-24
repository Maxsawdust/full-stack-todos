import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import TodoType from "../interfaces/TodoType";
import { TodoCardControl, EditTodo } from ".";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import {
  setTodoBeingEdited,
  setTodoBeingCompleted,
  updateTodo,
  deleteTodo,
} from "../store/reducers/listReducer";

interface TodoCardProps {
  todo: TodoType;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const dispatch = useAppDispatch();

  // getting the todoBeingEdited state from global store
  const todoBeingEdited = useAppSelector(
    (state) => state.listReducer.todoBeingEdited
  );

  const completeTodo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // PATCH to api
    try {
      // Set the todo being edited
      dispatch(setTodoBeingCompleted(todo._id));
      // Update the todo
      dispatch(updateTodo({ completed: e.target.checked }));

      // fetch with body included the new completed state
      const response = await fetch(
        `http://localhost:5000/lists/editTodo/${todo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: e.target.checked }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorMessage = (await response.json()).message;
        throw new Error(errorMessage);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editTodo = () => {
    // dispatching with this todo's _id
    dispatch(setTodoBeingEdited(todo._id));
  };

  const handleDeleteTodo = async () => {
    try {
      // DELETE request to api
      const response = await fetch(
        `http://localhost:5000/lists/deleteTodo/${todo._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // remove todo from global store
      dispatch(deleteTodo(todo._id));
      console.log(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  // lots of styles in here depend on completed state of the task
  return (
    <div
      className={`min-h-15 h-fit px-4 py-2 flex items-center gap-2 rounded-xl transition-all duration-100 ${
        todo.completed ? "bg-gray-200" : "bg-white"
      }`}>
      <div className="">
        <input
          type="checkbox"
          className="w-6 h-6 flex justify-center items-center"
          onChange={completeTodo}
          checked={todo.completed}
        />
      </div>

      <div
        className={`flex-1 max-w-full h-full text-xl px-2 flex items-center border-gray-200 overflow-x-scroll ${
          todo.completed ? "line-through text-green-700" : ""
        }`}>
        {/* if the todoBeingEdited matches the todo._id, then display the input box */}
        {todoBeingEdited === todo._id ? <EditTodo todo={todo} /> : todo.message}
      </div>

      <div className="w-60 h-full px-12 flex justify-center items-center gap-8 ">
        {/* these control buttons use inline styles in order to remove
            functionality when complete */}
        <TodoCardControl
          label="Edit Task"
          onClick={todo.completed ? undefined : editTodo}
          style={
            todo.completed
              ? {
                  pointerEvents: "none",
                  backgroundColor: "#e5e7eb",
                  boxShadow: "none",
                  color: "green",
                }
              : {}
          }>
          <MdOutlineEdit className="text-2xl" />
        </TodoCardControl>
        <TodoCardControl label="Delete Task" onClick={handleDeleteTodo}>
          <MdOutlineDelete className="text-2xl" />
        </TodoCardControl>
      </div>
    </div>
  );
}
