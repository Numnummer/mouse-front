import React, { useEffect, useState } from "react";
import PastMessagesArea from "./Components/PastMessagesArea/PastMessagesArea";
import SendMessageArea from "./Components/SendMessageArea/SendMessageArea";
import "./Chat.css";
import PropTypes from "prop-types";
import ChatHeader from "./Components/ChatHeader/ChatHeader.jsx";
import loadChatHistory from "./Services/LoadChatHistory.js";
import getCurrentUserInfo from "../../../../../../Api/User/GetCurrentUserInfo.js";
import { connectChat } from "../../Services/ConnectChat.js";
import { HubConnection } from "@microsoft/signalr";
import onUnicastMessageReceive from "../../Services/OnUnicastMessageReceive.js";
import onMulticastMessageReceive from "../../Services/OnMulticastMessageReceive.js";

export default function Chat({
  messages,
  destination,
  isUnicast,
  onAuthorClick,
  onBackButtonClick,
  setMessages,
  role,
  connection,
  setConnection,
}) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    getCurrentUserInfo().then((data) => {
      setEmail(data.email);
      const currentEmail = data.email;
      // Подключаемся к хабу на бэкэнде
      connectChat(
        (author, text, date) => {
          onUnicastMessageReceive(
            author,
            text,
            date,
            isUnicast,
            destination,
            setMessages,
            data.email,
          );
        },
        (author, text, date, group) => {
          onMulticastMessageReceive(
            author,
            text,
            date,
            group,
            destination,
            setMessages,
            data.email,
          );
        },
        role,
        currentEmail,
      ).then((resultConnection) => {
        console.log(resultConnection);
        setConnection(resultConnection);

        // подгрузить историю чата
        loadChatHistory(isUnicast, destination, setMessages, data.email, role);
      });
    });
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
        role={role}
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
  destination: PropTypes.string.isRequired,
  isUnicast: PropTypes.bool.isRequired,
  onAuthorClick: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  setMessages: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  connection: PropTypes.instanceOf(HubConnection).isRequired,
  setConnection: PropTypes.func.isRequired,
};
