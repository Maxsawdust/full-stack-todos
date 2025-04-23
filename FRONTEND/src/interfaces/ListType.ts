import TodoType from "./TodoType";

export default interface ListType {
  title: string;
  content: TodoType[];
  _id?: string;
}
