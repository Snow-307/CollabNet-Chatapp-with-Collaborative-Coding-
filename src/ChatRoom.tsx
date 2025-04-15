import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import AddMsgForm from "./AddMsgForm";
import Msg from "./Msg";

import { useReactiveStore } from "./store";
import Navigation from "./Navigation";

export default function ChatRoom() {
  const { roomId = "default" } = useParams<{ roomId: string }>();

  const state = useReactiveStore();

  const chat = state.chat[roomId];
  const chatMsgRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (chatMsgRef.current) {
        chatMsgRef.current.scrollTop = chatMsgRef.current.scrollHeight;
    }
  }, [roomId, chat?.msgs.length]);

  const onAddMsg = (newMsg: string) => {
    chat?.msgs.push({
      content: newMsg.trim(),
      timestamp: Date.now(),
    });
  };

  const msgs = chat?.msgs || [];

  return (
    
    <main>
      <section className="channel-notes" ref={chatMsgRef}>
        <h2>#{roomId}</h2>
        <div>
          {msgs.map((msg, index) => (
            <Msg
              key={index}
              content={msg.content}
              timestamp={msg.timestamp}
            />
          ))}
        </div>
      </section>
      <AddMsgForm onAddMsg={onAddMsg} />
    </main>
  );
}
