import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { hubConnectionUrl } from "../../../../Constants/Messages";
import MessageContainer from "./MessageContainer/MessageContainer";
import SendMessageBar from "./SendMessageBar/SendMessageBar";
import {authToken} from "../../../../Constants/LocalStorageItemKeys";
import {userClient} from "../../../../Constants/AxiosClients.js";

export default function Messages({ currentTab }) {
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState();
  const [userRole, setUserRole] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  useEffect( () => {
    const chatConnection = new HubConnectionBuilder()
        .withUrl(hubConnectionUrl)
        .build();

    //chatConnection.start().then(() => setConnection(chatConnection))

    let token = localStorage.getItem(authToken);
    console.log(token);
    console.log("123123123");
    userClient.get("currentRole", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => setUserRole(response.data))

    console.log("999999999999");
    userClient.get("currentUserInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => setCurrentUserId(response.data.userId.toString()))
    console.log(currentUserId);

    chatConnection.on("ReceiveMessage", (sendDate, messageText, coachName) => {
      setMessages([
        {author: coachName, body: messageText, date: sendDate}
      ])
    })
    chatConnection.start().then(() => setConnection(chatConnection))
  }, [currentTab]);
  return (
    <div className="user-page-container">
      <MessageContainer messages={messages}></MessageContainer>
      {userRole === "Coach" && (
        <SendMessageBar
          connection={connection} userId={currentUserId}
        ></SendMessageBar>
      )}
    </div>
  );
}
