export type User = {
  _id: string;
  //   conversations: string[];
};
export type Conversation = {
  _id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
};
export type Message = {
  _id: string;
  conversation: string;
  contents: string;
  createdAt: number;
  from: string;
};
