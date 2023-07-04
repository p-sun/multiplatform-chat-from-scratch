import { useEffect, useRef } from 'react';
import { Message, User } from '../models/models';

function ChatBubble(props: { message: Message; isSelf: boolean }) {
  const { message, isSelf } = props;

  const Spacer = <div className='bubble-spacer' />;

  const MessageBubble = (
    <div key={message._id} className={'chat-bubble ' + (isSelf ? 'self' : 'non-self')}>
      {message.contents}
    </div>
  );

  return (
    <div className='chat-bubble-hstack'>
      {isSelf ? Spacer : MessageBubble}
      {isSelf ? MessageBubble : Spacer}
    </div>
  );
}

export function MessagesList(props: { messages: Message[]; user: User }) {
  const { messages, user } = props;
  const messagesContainer = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  });

  const msgsViews = messages.map((msg) => (
    <ChatBubble key={msg._id} message={msg} isSelf={user._id === msg.from} />
  ));

  return (
    <div className='messages-list' ref={messagesContainer}>
      <br />
      {msgsViews}
    </div>
  );
}
