import { useEffect } from "react";
import Message from "../Message/Message";
import "./MessageContainer.css";

export default function MessageContainer({ messages, role, newMessage }) {
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <div className="messages-container">
      {messages &&
        messages.map((message, index) => (
          <Message message={message} key={index} role={role}></Message>
        ))}
    </div>
  );
}
