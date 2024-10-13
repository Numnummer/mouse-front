import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { hubConnectionUrl } from "../../../../Constants/Messages";
import MessageContainer from "./MessageContainer/MessageContainer";
import SendMessageBar from "./SendMessageBar/SendMessageBar";
import getCurrentRole from "../../../../Api/User/GetCurrentRole.js";
import getCurrentUserInfo from "../../../../Api/User/GetCurrentUserInfo.js";
import getMessages from "../../../../Api/Messages/GetMessages.js";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import PropTypes from "prop-types";

export default function Messages({ currentTab }) {
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState();
  const [userRole, setUserRole] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  useEffect(() => {
    const chatConnection = new HubConnectionBuilder()
      .withUrl(hubConnectionUrl)
      .build();

    getCurrentRole().then((response) => {
      setUserRole(response);
    });

    getCurrentUserInfo().then((response) =>
      setCurrentUserId(response.userId.toString())
    );

    getMessages()
      .then((resp) => {
        setMessages(resp.items);
      })
      .catch(() => {
        toast.error("Не удалось загрузить сообщения");
      });

    chatConnection.on("ReceiveMessage", (receiveData) => {
      setMessages((prev) => [
        ...prev,
        {
          senderName: receiveData.from,
          messsageText: receiveData.message,
          sendDate: receiveData.createdDate,
        },
      ]);
    });

    chatConnection.start().then(() => {
      setConnection(chatConnection);
    });
  }, [currentTab]);

  return (
    <div className="user-page-container">
      <ToastContainer></ToastContainer>
      <div className="user-messages-container">
        <MessageContainer
          messages={messages}
          role={userRole}
        ></MessageContainer>
        {userRole === "Coach" && (
          <SendMessageBar
            connection={connection}
            userId={currentUserId}
          ></SendMessageBar>
        )}
      </div>
    </div>
  );
}

Messages.propTypes = {
  currentTab: PropTypes.string.isRequired,
};
