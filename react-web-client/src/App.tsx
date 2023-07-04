import './App.css';
import { useEffect, useRef, useState } from 'react';
import { MessagesList } from './components/MessagesList';
import { ConvoInput } from './components/InputContainer';
import { ConversationsList } from './components/ConversationsList';
import { createClientIO } from './network/createClientIO';
import { ChatManager } from './managers/ChatManager';
import { Conversation, Message, User } from './models/models';

function useChatManager() {
  const mainConvo: Conversation = {
    _id: `649e2c53a270e945e0c285d5`,
    title: 'Conversation 0',
    createdAt: 0,
    updatedAt: 123,
  };
  const user: User = {
    _id: '649e27b48f89b7524b2cbe56',
  };

  const chatManager = useRef(new ChatManager());
  const [convos, setConvos] = useState(
    Array.from({ length: 10 }, (_, i) => {
      const convo: Conversation =
        i === 0
          ? mainConvo
          : {
              _id: `id - ${i}`,
              title: `Conversation ${i}`,
              createdAt: new Date().getTime(),
              updatedAt: new Date().getTime(),
            };
      return convo;
    })
  );
  const [msgs, setMessages] = useState([] as Message[]);
  const onSubmit = (contents: string) => {
    setMessages((prevMsgs) => {
      chatManager.current.sendMessage({ from: user, contents, conversation: mainConvo });
      return chatManager.current.getMessages();
    });
  };

  useEffect(() => {
    createClientIO();

    chatManager.current.fetchMessages(mainConvo).then((msgs) => {
      setMessages(msgs);
    });
  }, []);

  return { convos, msgs, user, onSubmit };
}

function App() {
  const { convos, msgs, user, onSubmit } = useChatManager();

  return (
    <div className='main-container'>
      <div className='left-panel'>
        <ConversationsList convos={convos} />
      </div>
      <div className='right-panel'>
        <MessagesList messages={msgs} user={user} />
        <br />
        <ConvoInput onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default App;
