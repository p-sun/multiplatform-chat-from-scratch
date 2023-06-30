import './App.css';
import { Conversation } from './components/Conversation';

function App() {
  const msgs = Array.from({ length: 10 }).map((val, i) => String(i));
  return (
    <div className='todo-app'>
      <Conversation messages={msgs} />
    </div>
  );
}

export default App;
