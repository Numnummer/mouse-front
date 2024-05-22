import { useState } from "react";
import "./SendMessageBar.css";
import sendMessage from "./Services/SendMessage";
import { Button, Input, Space } from "antd";

// eslint-disable-next-line react/prop-types
export default function SendMessageBar({ connection, userId }) {
  const [message, setMessage] = useState("");

  return (
    <div className="send-message-bar">
      <Space.Compact>
        <Input
          type="text"
          className="send-input"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Ваше сообщение"
        />
        <Button
          type="primary"
          className="send-button"
          onClick={() => {
            sendMessage(userId, message, connection);
          }}
        >
          Send
        </Button>
      </Space.Compact>
    </div>
  );
}
