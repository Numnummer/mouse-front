import PropTypes from "prop-types";
import React from "react";
import "./ChatMessage.css";

export default function ChatMessage({ from, text, date, isFromSelf }) {
  return (
    <div
      className={
        isFromSelf
          ? "ChatMessage_Container_SelfMessage"
          : "ChatMessage_Container"
      }
    >
      <div className="ChatMessage_from">{from}</div>
      <div className="ChatMessage_Text">{text}</div>
      <div className="ChatMessage_Date">{date}</div>
    </div>
  );
}

ChatMessage.propTypes = {
  from: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  isFromSelf: PropTypes.bool.isRequired,
};
