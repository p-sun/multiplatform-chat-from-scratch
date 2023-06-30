import { useEffect, useRef } from 'react';

function ConversationSummary(props: { title: string; subtitle: string; isSelected: boolean }) {
  const { title, subtitle, isSelected } = props;

  return (
    <div className={'conversation-summary ' + (isSelected ? 'selected' : '')}>
      <text className='title'>{title}</text>
      <br />
      <text className='subtitle'>{subtitle}</text>
    </div>
  );
}

export function ConversationsList(props: { messages: string[] }) {
  const { messages } = props;
  const container = useRef(null as HTMLDivElement | null);

  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = 0;
    }
  });

  const msgsViews: React.ReactElement[] = [];
  for (const msg of messages) {
    msgsViews.push(
      <ConversationSummary
        key={Math.random() * 100000}
        title={msg}
        subtitle={msg}
        isSelected={Math.random() > 0.5}
      />
    );
  }

  return (
    <div className='conversation-summary-list' ref={container}>
      <br></br>
      {msgsViews}
    </div>
  );
}
