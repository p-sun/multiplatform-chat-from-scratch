function ChatBubble(props: { message: string; isSelf: boolean }) {
  const { message, isSelf } = props;

  const Spacer = <div className='chat-bubble-spacer' />;

  const bubbleClass = isSelf ? 'chat-bubble-self' : 'chat-bubble-non-self';
  const MessageBubble = (
    <div key={message} className={'chat-bubble ' + bubbleClass}>
      This is a message This is a message This is a message This is a message This is a message:{' '}
      {message}
    </div>
  );

  const left = isSelf ? Spacer : MessageBubble;
  const right = isSelf ? MessageBubble : Spacer;
  return (
    <div className='chat-bubble-hstack'>
      {left}
      {right}
    </div>
  );
}

export function Conversation(props: { messages: string[] }) {
  const { messages } = props;
  const msgsViews: React.ReactElement[] = [];

  for (const msg of messages) {
    msgsViews.push(<ChatBubble message={msg} isSelf={Math.random() > 0.5} />);
  }
  return <div className='messages-list'>{msgsViews}</div>;
}
