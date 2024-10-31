import React, { useState } from "react";
import "./SendMessageArea.css";
import PropTypes from "prop-types";
import { HubConnection } from "@microsoft/signalr";
import onSendMessage from "./Services/OnSendMessage.js";

export default function SendMessageArea({
  connection,
  destination,
  isUnicast,
  email,
  setMessages,
  role,
}) {
  const [currentMessage, setCurrentMessage] = useState("");
  return (
    <div className="SendMessageArea_Container">
      <input
        className="SendMessageArea_Input"
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        value={currentMessage}
      ></input>
      <button
        className="SendMessageArea_Button"
        onClick={() => {
          onSendMessage(
            email,
            connection,
            setMessages,
            currentMessage,
            setCurrentMessage,
            destination,
            isUnicast,
            role,
          );
        }}
      >
        Отправить
      </button>
    </div>
  );
}

SendMessageArea.propTypes = {
  connection: PropTypes.instanceOf(HubConnection).isRequired,
  destination: PropTypes.string.isRequired,
  isUnicast: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  setMessages: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};
