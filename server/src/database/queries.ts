import {
  IMessage,
  Message,
  User,
  IUser,
  IConversation,
  Conversation,
} from '../models/schemas';

export async function createNewConvo(convo: IConversation) {
  const newConvo = new Conversation(convo);
  await newConvo.save();
  return newConvo;
}

export async function getMainConvo(title: String) {
  return (await Conversation.findOne().where('title').byTitle(title)).at(0);
}

export async function createNewMessage(msg: IMessage) {
  const newMessage = new Message(msg);
  await newMessage.save();
}

export async function getAllMessages() {
  return await Message.find();
}

export async function createNewUser(user: IUser) {
  const newUser = new User(user);
  await newUser.save();
  console.log('Created new user:', newUser);
  return newUser;
}

export async function findFirstUserByEmail(email: string) {
  return (await User.findOne().where('name').gt(10).byEmail(email)).at(0);
}
