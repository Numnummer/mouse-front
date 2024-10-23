import React, { useEffect, useState } from "react";
import Chat from "./Components/Chat/Chat";
import ChooseDestination from "./Components/ChooseDestination/ChooseDestination";
import { loadChatHistory } from "./Services/LoadChatHistory";
import { connectChat } from "./Services/ConnectChat";
import getCurrentRole from "../../../../Api/User/GetCurrentRole";

export default function SupportChat() {
  const [destination, setDestination] = useState();
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState();
  const [role, setRole] = useState("User");

  useEffect(() => {
    // Сначала подгрузить историю чата
    loadChatHistory().then((messages) => {
      setMessages(messages);
    });

    // Подгрузить текущую роль
    getCurrentRole().then((value) => setRole(value));

    // Определяем функцию, вызываемую при получении сообщения
    const onMessageReceive = (author, text, date) => {
      setMessages([
        ...messages,
        new {
          from: author,
          text: text,
          date: date,
          isFromSelf: false,
        }(),
      ]);
    };

    // Подключаемся к хабу на бэкэнде
    connectChat(onMessageReceive).then((resultConnection) => {
      setConnection(resultConnection);
    });

    return () => {
      connection.stop();
    };
  }, []);
  return (
    <div>
      {destination ? (
        <Chat messages={messages} connection={connection}></Chat>
      ) : (
        <ChooseDestination
          role={role}
          setDestination={setDestination}
        ></ChooseDestination>
      )}
    </div>
  );
}
