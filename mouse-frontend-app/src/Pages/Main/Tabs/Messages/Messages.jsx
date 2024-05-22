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

export default function Messages({ currentTab }) {
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState();
  const [userRole, setUserRole] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  useEffect(() => {
    const chatConnection = new HubConnectionBuilder()
      .withUrl(hubConnectionUrl)
      .build();

    let token = localStorage.getItem(authToken);
    userClient
      .get("currentRole", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUserRole(response.data));

    userClient
      .get("currentUserInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setCurrentUserId(response.data.userId.toString()));

    messagesClient
      .get("messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setMessages(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    chatConnection.on("ReceiveMessage", (sendDate, coachName, messageText) => {
      console.log({ author: coachName, body: messageText, date: sendDate });
      setMessages((prev) => [
        ...prev,
        { author: coachName, body: messageText, date: sendDate },
      ]);
    });

    chatConnection.start().then(() => {
      setConnection(chatConnection);
    });

    setMessages([
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
    ]);
  }, [currentTab]);

  return (
    <div className="user-page-container">
      <div className="user-messages-container">
        <MessageContainer messages={messages}></MessageContainer>
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
