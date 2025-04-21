export default interface ListType {
  title: string;
  content: {
    message: string;
    completed: boolean;
  }[];
}
