import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { hubConnectionUrl } from "../../../../Constants/Messages";
import MessageContainer from "./MessageContainer/MessageContainer";
import SendMessageBar from "./SendMessageBar/SendMessageBar";
import { authToken } from "../../../../Constants/LocalStorageItemKeys";
import {
  messagesClient,
  userClient,
} from "../../../../Constants/AxiosClients.js";
import getCurrentRole from "../../../../Api/User/GetCurrentRole.js";
import getCurrentUserInfo from "../../../../Api/User/GetCurrentUserInfo.js";
import getMessages from "../../../../Api/Messages/GetMessages.js";
import { ToastContainer } from "react-toastify";

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
      console.log(response);
      setUserRole(response);
    });

    getCurrentUserInfo().then((response) =>
      setCurrentUserId(response.userId.toString())
    );

    getMessages()
      .then((resp) => {
        setMessages(resp);
      })
      .catch((err) => {
        toast.error("Не удалось загрузить сообщения");
      });

    chatConnection.on("ReceiveMessage", (sendDate, coachName, messageText) => {
      const prevMessages = messages.items;
      setMessages({
        items: [
          ...prevMessages,
          { author: coachName, body: messageText, date: sendDate },
        ],
      });
    });

    chatConnection.start().then(() => {
      setConnection(chatConnection);
    });

    /*setMessages([
      { author: "coachName", body: "messageText", date: new Date() },
      { author: "coachName", body: "messageText", date: new Date() },
      {
        author: "coachName",
        body: "messageTextmessageTextmessageTextmessageTextmessageTextmessageTextmessageTextmessageTextmessageTextmessageTextmessageTextmessageTextmessageTextmessageTextmessageText",
        date: new Date(),
      },
      { author: "coachName", body: "messageText", date: new Date() },
      { author: "coachName", body: "messageText", date: new Date() },
      { author: "coachName", body: "messageText", date: new Date() },
      { author: "coachName", body: "messageText", date: new Date() },
      { author: "coachName", body: "messageText", date: new Date() },
      { author: "coachName", body: "messageText", date: new Date() },
    ]);*/
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
