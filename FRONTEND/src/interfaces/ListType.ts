export interface ContentType {
  message: string;
  completed: boolean;
  _id?: string;
}

export default interface ListType {
  title: string;
  content: ContentType[];
  _id?: string;
}
