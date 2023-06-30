import { useEffect, useRef } from 'react';

function ChatBubble(props: { message: string; isSelf: boolean }) {
  const { message, isSelf } = props;

  const Spacer = <div className='bubble-spacer' />;

  const MessageBubble = (
    <div key={message} className={'chat-bubble ' + (isSelf ? 'self' : 'non-self')}>
      This is a message This is a message This is a message This is a message This is a message:{' '}
      {message}
    </div>
  );

  return (
    <div className='chat-bubble-hstack'>
      {isSelf ? Spacer : MessageBubble}
      {isSelf ? MessageBubble : Spacer}
    </div>
  );
}

export function Conversation(props: { messages: string[] }) {
  const { messages } = props;
  const messagesContainer = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  });

  const msgsViews = messages.map((msg) => (
    <ChatBubble key={Math.random() * 100000} message={msg} isSelf={Math.random() > 0.5} />
  ));

  return (
    <div className='messages-list' ref={messagesContainer}>
      <br />
      {msgsViews}
    </div>
  );
}
