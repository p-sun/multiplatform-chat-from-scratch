import { Conversation, Message, User } from '../models/models';

export class ChatManager {
  private _serverMessages: Message[] = [];
  private _newMessages: Message[] = []; // Preemtively display new messages before they are saved into the server

  public getMessages(): Message[] {
    console.log('getMessages()', this._serverMessages, this._newMessages);
    return this._serverMessages.concat(this._newMessages);
  }

  public async fetchMessages(convo: Conversation): Promise<Message[]> {
    const json = await fetch(`http://localhost:8000/messages?convoId=${convo._id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      // body: JSON.stringify(data),
    }).then((res) => res.json());
    this._serverMessages = json.messages as Message[];
    return this._serverMessages;
  }

  public sendMessage(c: { from: User; conversation: Conversation; contents: string }) {
    const newMsg: Message = {
      _id: `${Math.random() * 100000}`,
      contents: c.contents,
      from: c.from._id,
      conversation: c.conversation._id,
      createdAt: new Date().getTime(),
    };
    this._newMessages.push(newMsg);
  }
}
