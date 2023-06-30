import { useRef, useState, useEffect } from 'react';

export function ConvoInput(props: { onSubmit: (text: string) => void }) {
  const inputRef = useRef(null as HTMLInputElement | null);
  const [input, setInput] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const value = inputRef.current?.value;
    if (value) {
      console.log('Submit: ', value);
      props.onSubmit(value);
    }
    setInput('');
  };

  const handleChange = () => {
    const value = inputRef.current?.value;
    if (value) {
      setInput(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='conversation-input'>
      <div className='bubble'>
        <input
          placeholder='Aa'
          value={input}
          onChange={handleChange}
          name='text'
          ref={inputRef}
          className='text-input'
          autoComplete='off'
        />
      </div>
    </form>
  );
}
