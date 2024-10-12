import "./Message.css";
import React from "react";
import PropTypes from "prop-types";

export default function Message({ message, role }) {
  const date = new Date(message.sendDate);
  const options = {
    month: "short", // короткое название месяца
    day: "numeric", // день месяца
    year: "numeric", // год
    hour: "2-digit", // часы
    minute: "2-digit", // минуты
    hour12: false, // 24-часовой формат
  };
  const formattedDate = date.toLocaleString("en-US", options).replace(",", "");

  const wrapp = document.getElementsByClassName("message-container");
  wrapp.scrollTop = wrapp.scrollHeight;

  return (
    <div className="message-container">
      <div className="">
        <p className="author">{message.senderName}</p>
        <div className="message-and-icon">
          <p className={role == "Coach" ? "send" : "receive"}>
            {message.messsageText}
          </p>
          {/* <img className="trainer-icon" src={img} height={"45px"} /> */}
        </div>
        <p className="message-date">{formattedDate}</p>
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
};
