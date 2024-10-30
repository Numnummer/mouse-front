import React from "react";
import ChatMessage from "./components/ChatMessage/ChatMessage";
import PropTypes from "prop-types";
import "./PastMessagesArea.css";

export default function PastMessagesArea({ messages, onAuthorClick }) {
  return (
    <div className="PastMessagesArea_Container">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          from={message.from}
          text={message.text}
          date={message.date}
          isFromSelf={message.isFromSelf}
          onAuthorClick={onAuthorClick}
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
    }),
  ),
  onAuthorClick: PropTypes.func.isRequired,
};
