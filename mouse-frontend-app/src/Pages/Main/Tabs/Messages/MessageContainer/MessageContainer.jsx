import Message from "../Message/Message";
import "./MessageContainer.css";

export default function ({ messages }) {
  return (
    <div>
      {messages.map((message, index) => (
        <Message message={message} key={index}></Message>
      ))}
    </div>
  );
}
