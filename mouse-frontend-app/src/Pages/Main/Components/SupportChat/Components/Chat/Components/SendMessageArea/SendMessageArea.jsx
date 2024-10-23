import React, { useState } from "react";
import "./SendMessageArea.css";
import PropTypes from "prop-types";
import sendChatMessage from "./Services/SendChatMessage";
import { HubConnection } from "@microsoft/signalr";

export default function SendMessageArea({ connection }) {
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
        onClick={() => sendChatMessage(connection, currentMessage)}
      ></button>
    </div>
  );
}

SendMessageArea.propTypes = {
  connection: PropTypes.instanceOf(HubConnection).isRequired,
};
