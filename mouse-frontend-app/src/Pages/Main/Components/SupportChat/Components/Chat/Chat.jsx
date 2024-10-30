import React, { useEffect } from "react";
import PastMessagesArea from "./Components/PastMessagesArea/PastMessagesArea";
import SendMessageArea from "./Components/SendMessageArea/SendMessageArea";
import "./Chat.css";
import PropTypes from "prop-types";
import { HubConnection } from "@microsoft/signalr";
import ChatHeader from "./Components/ChatHeader/ChatHeader.jsx";
import loadChatHistory from "./Services/LoadChatHistory.js";

export default function Chat({
  messages,
  connection,
  destination,
  isUnicast,
  onAuthorClick,
  onBackButtonClick,
  email,
  setMessages,
  role,
}) {
  useEffect(() => {
    // подгрузить историю чата
    loadChatHistory(isUnicast, destination, setMessages, email, role);
  }, [isUnicast, destination]);
  return (
    <div className="Chat_Container">
      <ChatHeader
        destination={destination}
        isUnicast={isUnicast}
        onBackButtonClick={onBackButtonClick}
      ></ChatHeader>
      <PastMessagesArea
        messages={messages}
        onAuthorClick={onAuthorClick}
      ></PastMessagesArea>
      <SendMessageArea
        connection={connection}
        destination={destination}
        isUnicast={isUnicast}
        email={email}
        setMessages={setMessages}
      ></SendMessageArea>
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
    }),
  ),
  connection: PropTypes.instanceOf(HubConnection).isRequired,
  destination: PropTypes.string.isRequired,
  isUnicast: PropTypes.bool.isRequired,
  onAuthorClick: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setMessages: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};
