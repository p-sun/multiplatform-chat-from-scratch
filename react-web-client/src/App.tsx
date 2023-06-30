import { useState } from 'react';
import './App.css';
import { Conversation } from './components/Conversation';
import { ConvoInput } from './components/InputContainer';

function App() {
  const [msgs, setMessages] = useState(Array.from({ length: 16 }).map((val, i) => String(i)));
  const onSubmit = (text: string) => {
    setMessages((prevMsgs) => prevMsgs.concat(text));
  };
  return (
    <div className='conversation-panel'>
      <Conversation messages={msgs} />
      <br />
      <ConvoInput onSubmit={onSubmit} />
    </div>
  );
}

export default App;
