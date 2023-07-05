import { Schema, Types, model } from 'mongoose';

export interface IUser {
  name: String;
  email: String;
  createdAt: number;
  convos: [Types.ObjectId];
  avatar?: string;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Number, required: true },
    convos: { type: [Types.ObjectId], required: true },
    avatar: String,
  },
  {
    query: {
      byEmail(email: String) {
        return this.find({ email });
      },
    },
  }
);
export const User = model('User', userSchema);

export interface IConversation {
  title: String;
}
const conversationSchema = new Schema(
  {
    title: { type: String, required: true },
  },
  {
    query: {
      byTitle(title: String) {
        return this.find({ title });
      },
    },
  }
);
export const Conversation = model('Conversation', conversationSchema);

export interface StringIdentifiable {
  _id: string;
}

export interface IMessage {
  conversation: Types.ObjectId;
  from: Types.ObjectId;
  contents: String;
  createdAt: number;
}
const messageSchema = new Schema(
  {
    conversation: { type: Types.ObjectId, required: true },
    from: { type: Types.ObjectId, required: true },
    contents: { type: String, required: true },
    createdAt: { type: Number, required: true },
  },
  {
    query: {
      byConversationId(convoId: Types.ObjectId) {
        return this.find({ conversation: convoId });
      },
    },
  }
);
export const Message = model('Message', messageSchema);
