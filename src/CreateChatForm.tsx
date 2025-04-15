import { useState } from 'react';

type CreateChatFormProps = {
  onCreateChat: (chatName: string) => void;
}

export default function CreateChatForm({ onCreateChat }: CreateChatFormProps) {
  const [newChatName, setNewChatName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newChatName.trim()) {
      onCreateChat(newChatName.trim());
      setNewChatName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newChatName}
        onChange={(e) => setNewChatName(e.target.value)}
        placeholder="New Chat name"
      />
      <button type="submit">Create New Chat</button>
    </form>
  );
}
