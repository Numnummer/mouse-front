import Message from "../Message/Message";
import "./MessageContainer.css";

export default function MessageContainer({ messages }) {
  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <Message message={message} key={index}></Message>
      ))}
    </div>
  );
}
