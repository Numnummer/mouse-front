import React from "react";
import PastMessagesArea from "./Components/PastMessagesArea/PastMessagesArea";
import SendMessageArea from "./Components/SendMessageArea/SendMessageArea";
import "./Chat.css";
import PropTypes from "prop-types";
import { HubConnection } from "@microsoft/signalr";

export default function Chat({ messages, connection }) {
  return (
    <div className="Chat_Container">
      <PastMessagesArea messages={messages}></PastMessagesArea>
      <SendMessageArea connection={connection}></SendMessageArea>
    </div>
  );
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      isFromSelf: PropTypes.bool,
    })
  ),
  connection: PropTypes.instanceOf(HubConnection).isRequired,
};
