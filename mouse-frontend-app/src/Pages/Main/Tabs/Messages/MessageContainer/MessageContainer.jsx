import { useEffect, useRef } from "react";
import Message from "../Message/Message";
import "./MessageContainer.css";

export default function MessageContainer({ messages, role }) {
  const messageContainer = useRef();
  const scrollToBottom = () => {
    if (messageContainer) {
      messageContainer.current.scrollTop =
        messageContainer.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className="messages-container" ref={messageContainer}>
      {messages &&
        messages.map((message, index) => (
          <Message message={message} key={index} role={role}></Message>
        ))}
    </div>
  );
}
