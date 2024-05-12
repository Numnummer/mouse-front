import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { hubConnectionUrl } from "../../../../Constants/Messages";
import MessageContainer from "./MessageContainer/MessageContainer";
import SendMessageBar from "./SendMessageBar/SendMessageBar";
import { userNameItem } from "../../../../Constants/LocalStorageItemKeys";

export default function Messages({ currentTab }) {
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState();
  const [userRole, setUserRole] = useState();
  useEffect(() => {
    /*const chatConnection = new HubConnectionBuilder()
      .withUrl(hubConnectionUrl)
      .build();
    setConnection(chatConnection);*/
    //Временно инициализирую переменные, потом это
    //будет приходить с бэка
    setUserRole("Couch");
    setMessages([
      { author: "asd", body: "qwe", date: new Date() },
      { author: "qw", body: "qwe", date: new Date() },
      { author: "aswqdsd", body: "qwwqedwe", date: new Date() },
      { author: "asqwdqd", body: "qwqwqewe", date: new Date() },
    ]);
  }, [currentTab]);
  return (
    <div className="user-page-container">
      <MessageContainer messages={messages}></MessageContainer>
      {userRole == "Couch" && (
        <SendMessageBar
          userName={localStorage.getItem(userNameItem)}
        ></SendMessageBar>
      )}
    </div>
  );
}
