import { useState } from "react";
import "./SendMessageBar.css";
import sendMessage from "./Services/SendMessage";
import { Button, Input, Space } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { HubConnection } from "@microsoft/signalr";

export default function SendMessageBar({ connection, userId }) {
  const [message, setMessage] = useState("");

  return (
    <div className="send-message-bar">
      <Space.Compact className="input-button-send">
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

SendMessageBar.propTypes = {
  connection: PropTypes.instanceOf(HubConnection).isRequired,
  userId: PropTypes.string.isRequired,
};
