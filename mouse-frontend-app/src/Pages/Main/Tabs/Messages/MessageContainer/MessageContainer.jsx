import Message from "../Message/Message";
import "./MessageContainer.css";

export default function MessageContainer({ messages, role }) {
  console.log(messages);
  return (
    <div className="messages-container">
      {messages.items &&
        messages.items.map((message, index) => (
          <Message message={message} key={index} role={role}></Message>
        ))}
    </div>
  );
}
