import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import TodoType from "../interfaces/TodoType";
import { TodoCardControl, EditTodo } from ".";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { setTodoBeingEdited } from "../store/reducers/listReducer";

interface TodoCardProps {
  todo: TodoType;
}

export default function TodoCard({ todo }: TodoCardProps) {
  // getting the todoBeingEdited state from global store
  const todoBeingEdited = useAppSelector(
    (state) => state.listReducer.todoBeingEdited
  );

  const dispatch = useAppDispatch();

  const editTodo = () => {
    // dispatching with this todo's _id
    dispatch(setTodoBeingEdited(todo._id));
  };

  const deleteTodo = () => {};

  return (
    <div className="min-h-15 h-fit px-4 py-2 flex items-center gap-2 bg-white rounded-xl">
      <div className="">
        <input
          type="checkbox"
          className="w-6 h-6 flex justify-center items-center"
        />
      </div>

      <div className="flex-1 max-w-full h-full text-xl px-2 flex items-center border-gray-200 overflow-x-scroll">
        {/* if the todoBeingEdited matches the todo._id, then display the input box */}
        {todoBeingEdited === todo._id ? <EditTodo todo={todo} /> : todo.message}
      </div>

      <div className="w-60 h-full px-12 flex justify-center items-center gap-8 ">
        <TodoCardControl label="Edit Task" onClick={editTodo}>
          <MdOutlineEdit className="text-2xl" />
        </TodoCardControl>
        <TodoCardControl label="Delete Task" onClick={deleteTodo}>
          <MdOutlineDelete className="text-2xl" />
        </TodoCardControl>
      </div>
    </div>
  );
}
