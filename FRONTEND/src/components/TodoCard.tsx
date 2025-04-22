import { ContentType } from "../interfaces/ListType";

interface TodoCardProps {
  todo: ContentType;
}

export default function TodoCard({ todo }: TodoCardProps) {
  return (
    //
    <div className="">{todo.message}</div>
  );
}
