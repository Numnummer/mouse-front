import "./ChatHeader.css";
import React from "react";
import PropTypes from "prop-types";

export default function ChatHeader({
  destination,
  isUnicast,
  onBackButtonClick,
}) {
  return (
    <div className="chat-header">
      {isUnicast ? (
        <button className="chat-header-back-button" onClick={onBackButtonClick}>
          {"<-"}
        </button>
      ) : (
        <></>
      )}
      <div className="chat-header-destination">{destination}</div>
    </div>
  );
}

ChatHeader.propTypes = {
  destination: PropTypes.string.isRequired,
  isUnicast: PropTypes.bool.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
};
