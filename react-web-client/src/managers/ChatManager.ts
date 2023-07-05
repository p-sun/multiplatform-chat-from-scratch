import { Conversation, Message, User } from '../models/models';
import { SocketClient } from './SocketClient';

export class ChatManager {
  private _serverMessages: Message[] = [];
  private _newMessages: Message[] = []; // Preemtively display new messages before we fetch them from the server
  private _socketClient = new SocketClient();

  onChange: (msgs: Message[]) => void = () => {};

  constructor() {
    this._socketClient.onMessage = (msg) => {
      this.pushNewServerMessage(msg);
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
    }).then((res) => res.json());
    this._serverMessages = json.messages as Message[];
    return this._serverMessages;
  }

  public async sendMessage(c: { from: User; conversation: Conversation; contents: string }) {
    let newMsg: Omit<Message, '_id'> & { fromSocketId: String } = {
      contents: c.contents,
      from: c.from._id,
      conversation: c.conversation._id,
      createdAt: new Date().getTime(),
      fromSocketId: this._socketClient.getSocketId(),
    };

    let tempId = `${Math.random() * 100000}`;
    this._newMessages.push({ _id: tempId, ...newMsg });

    return new Promise((resolve, reject) => {
      fetch(`http://localhost:8000/messages`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(newMsg),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log('Created new message:', json);
          this._newMessages = this._newMessages.filter((m) => m._id !== tempId);
          this.pushNewServerMessage(json.newMessage);
          resolve({});
        })
        .catch((err) => {
          console.error('Could not create new message:', err, newMsg);
          this._newMessages = this._newMessages.filter((m) => m._id !== tempId);
          reject(err);
        });
    });
  }

  private pushNewServerMessage(msg: Message) {
    if (!this._serverMessages.find((oldM) => oldM._id === msg._id)) {
      this._serverMessages.push(msg);
    }
    this.onChange(this.getMessages());
  }
}
