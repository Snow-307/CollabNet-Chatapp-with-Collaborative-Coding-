import React, { useState, KeyboardEvent } from 'react';
import TextareaAutosize from 'react-textarea-autosize'

type AddMsgFormProps = {
  onAddMsg: (content: string) => void;
};

export default function AddMsgForm({ onAddMsg }: AddMsgFormProps) {
  const [newMsg, setNewMsg] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMsg();
  };

  const submitMsg = () => {
    if (newMsg.trim()) {
      onAddMsg(newMsg.trim());
      setNewMsg('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      submitMsg();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextareaAutosize
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a new message"
        minRows={3}
      />
      <button type="submit">Send</button>
    </form>
  );
}
