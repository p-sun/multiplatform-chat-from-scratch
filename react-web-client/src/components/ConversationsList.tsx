import { useEffect, useRef, useState } from 'react';

function ConversationSummary(props: {
  title: string;
  subtitle: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const { title, subtitle, isSelected, onClick } = props;

  return (
    <div className={'conversation-summary ' + (isSelected ? 'selected' : '')} onClick={onClick}>
      <div className='title'>{title}</div>
      <br />
      <div className='subtitle'>{subtitle}</div>
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
        onClick={() => handleClick(i)}
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
