import './App.css';
import { useState } from 'react';
import { Conversation } from './components/Conversation';
import { ConvoInput } from './components/InputContainer';
import { ConversationsList } from './components/ConversationsList';

function App() {
  const [msgs, setMessages] = useState(Array.from({ length: 20 }).map((val, i) => String(i)));
  const onSubmit = (text: string) => {
    setMessages((prevMsgs) => prevMsgs.concat(text));
  };
  return (
    <div className='main-container'>
      <div className='left-panel'>
        <ConversationsList messages={msgs} />
      </div>
      <div className='right-panel'>
        <Conversation messages={msgs} />
        <br />
        <ConvoInput onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default App;
