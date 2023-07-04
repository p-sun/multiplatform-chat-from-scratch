import { useEffect, useRef, useState } from 'react';
import { Conversation } from '../models/models';

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

export function ConversationsList(props: { convos: Conversation[] }) {
  const { convos } = props;
  const container = useRef(null as HTMLDivElement | null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = 0;
    }
  }, [convos]);

  const handleClick = (val: number) => {
    setSelected(val);
  };

  const msgsViews: React.ReactElement[] = [];
  for (let i = 0; i < convos.length; i++) {
    msgsViews.push(
      <ConversationSummary
        key={Math.random() * 100000}
        title={convos[i].title}
        subtitle={`${convos[i].updatedAt}`}
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
