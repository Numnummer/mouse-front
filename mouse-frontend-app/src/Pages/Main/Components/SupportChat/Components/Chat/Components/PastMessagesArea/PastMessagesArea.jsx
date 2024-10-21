import React from "react";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import PropTypes from "prop-types";

export default function PastMessagesArea({ messages }) {
  return (
    <div className="PastMessagesArea_Container">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          from={message.from}
          text={message.text}
          date={message.date}
          isFromSelf={message.isFromSelf}
        ></ChatMessage>
      ))}
    </div>
  );
}

PastMessagesArea.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      isFromSelf: PropTypes.bool,
    })
  ),
};
