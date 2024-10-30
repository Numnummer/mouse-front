import React, { useEffect, useState } from "react";
import Chat from "./Components/Chat/Chat";
import ChooseDestination from "./Components/ChooseDestination/ChooseDestination";
import { connectChat } from "./Services/ConnectChat";
import getCurrentRole from "../../../../Api/User/GetCurrentRole";
import onMessageReceive from "./Services/OnMessageReceive.js";
import onAuthorClick from "./Services/OnAuthorClick.js";
import onBackButtonClick from "./Services/OnBackButtonClick.js";
import getCurrentUserInfo from "../../../../Api/User/GetCurrentUserInfo.js";

export default function SupportChat() {
  const [destination, setDestination] = useState();
  const [groupDestination, setGroupDestination] = useState();
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState();
  const [role, setRole] = useState("User");
  const [isUnicast, setIsUnicast] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Подгрузить текущую роль
    getCurrentRole().then((value) => {
      setRole(value);
    });

    getCurrentUserInfo().then((data) => {
      setEmail(data.email);
      // Подключаемся к хабу на бэкэнде
      connectChat(
        (author, text, date) => {
          onMessageReceive(author, text, date, setMessages);
        },
        role,
        data.Email,
      ).then((resultConnection) => {
        setConnection(resultConnection);
      });
    });

    return () => {
      connection.stop();
    };
  }, []);
  return (
    <div>
      {destination ? (
        <Chat
          destination={destination}
          messages={messages}
          connection={connection}
          isUnicast={isUnicast}
          email={email}
          onAuthorClick={(email) =>
            onAuthorClick(email, setMessages, setDestination, setIsUnicast)
          }
          onBackButtonClick={() =>
            onBackButtonClick(
              groupDestination,
              setMessages,
              setIsUnicast,
              setDestination,
              isUnicast,
            )
          }
          setMessages={setMessages}
          role={role}
        ></Chat>
      ) : (
        <ChooseDestination
          role={role}
          setDestination={setDestination}
          setGroupDestination={setGroupDestination}
        ></ChooseDestination>
      )}
    </div>
  );
}
