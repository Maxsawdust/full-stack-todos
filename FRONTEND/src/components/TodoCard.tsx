import TodoType from "../interfaces/TodoType";

interface TodoCardProps {
  todo: TodoType;
}

export default function TodoCard({ todo }: TodoCardProps) {
  return (
    //
    <div className="">{todo.message}</div>
  );
}
