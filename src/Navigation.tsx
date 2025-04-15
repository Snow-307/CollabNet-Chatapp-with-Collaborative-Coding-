import CreateChatForm from "./CreateChatForm";
import { Link } from "react-router-dom";

import { useReactiveStore } from "./store";

export default function Navigation() {
  const state = useReactiveStore();

  const handleCreateChat= (newChatName: string) => {
    if (newChatName && !state.chat[newChatName]) {
      state.chat[newChatName] = { msgs: [] };
    }
  };
  const sortedChat = Object.keys(state.chat).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );

  return (
    <nav>
      <h2>Discussions</h2>
      <ul>
        {sortedChat.map((id) => (
          <li key={id}>
            <Link to={`/room/${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
      <CreateChatForm onCreateChat={handleCreateChat} />
      <Link to="/config">Settings</Link>
    </nav>
  );
}
