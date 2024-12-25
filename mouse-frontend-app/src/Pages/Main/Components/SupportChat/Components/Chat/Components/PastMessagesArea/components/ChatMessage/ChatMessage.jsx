import PropTypes from "prop-types";
import React from "react";
import "./ChatMessage.css";
import { onFileNameClick } from "../../Services/OnFileNameClick.js";

export default function ChatMessage({
  from,
  text,
  date,
  isFromSelf,
  onAuthorClick,
  fileNames,
}) {
  return (
    <div
      className={
        isFromSelf
          ? "ChatMessage_Container_SelfMessage"
          : "ChatMessage_Container"
      }
    >
      <div className="ChatMessage_from" onClick={() => onAuthorClick(from)}>
        {from}
      </div>
      <div className="ChatMessage_Text">{text}</div>
      {fileNames.map((fileName, index) => (
        <div
          className="ChatMessage_File"
          key={index}
          onClick={() => onFileNameClick(fileName)}
        >
          {fileName}
        </div>
      ))}
      <div className="ChatMessage_Date">{date}</div>
    </div>
  );
}

ChatMessage.propTypes = {
  from: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  isFromSelf: PropTypes.bool.isRequired,
  onAuthorClick: PropTypes.func.isRequired,
  fileNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
