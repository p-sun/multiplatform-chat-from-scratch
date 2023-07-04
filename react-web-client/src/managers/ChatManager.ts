import { Conversation, Message, User } from '../models/models';
import { SocketClient } from './SocketClient';

export class ChatManager {
  private _serverMessages: Message[] = [];
  private _newMessages: Message[] = []; // Preemtively display new messages before we fetch them from the server
  private _socketClient = new SocketClient();

  constructor() {
    this._socketClient.onMessage = (msg) => {
      // this._newMessages.push(msg);
    };
  }

  public getMessages(): Message[] {
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
