import { useEffect, useRef, useState } from 'react';

function ConversationSummary(props: {
  title: string;
  subtitle: string;
  isSelected: boolean;
  onclick: () => void;
}) {
  const { title, subtitle, isSelected, onclick } = props;

  return (
    <div className={'conversation-summary ' + (isSelected ? 'selected' : '')} onClick={onclick}>
      <text className='title'>{title}</text>
      <br />
      <text className='subtitle'>{subtitle}</text>
    </div>
  );
}

export function ConversationsList(props: { messages: string[] }) {
  const { messages } = props;
  const container = useRef(null as HTMLDivElement | null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = 0;
    }
  }, [messages]);

  const handleClick = (val: number) => {
    setSelected(val);
  };

  const msgsViews: React.ReactElement[] = [];
  for (let i = 0; i < messages.length; i++) {
    msgsViews.push(
      <ConversationSummary
        key={Math.random() * 100000}
        title={messages[i]}
        subtitle={messages[i]}
        isSelected={selected === i}
        onclick={() => handleClick(i)}
      />
    );
  }

  return (
    <div className='conversation-summary-list' ref={container}>
      <br />
      {msgsViews}
    </div>
  );
}
