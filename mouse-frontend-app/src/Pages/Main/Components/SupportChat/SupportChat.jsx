import React, { useEffect, useState } from "react";
import Chat from "./Components/Chat/Chat";
import ChooseDestination from "./Components/ChooseDestination/ChooseDestination";
import onAuthorClick from "./Services/OnAuthorClick.js";
import onBackButtonClick from "./Services/OnBackButtonClick.js";
import getCurrentRole from "../../../../Api/User/GetCurrentRole.js";

export default function SupportChat() {
  const [destination, setDestination] = useState();
  const [groupDestination, setGroupDestination] = useState();
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState("User");
  const [isUnicast, setIsUnicast] = useState(false);
  const [connection, setConnection] = useState();
  useEffect(() => {
    // Подгрузить текущую роль
    getCurrentRole().then((value) => {
      setRole(value);
    });
  }, []);
  return (
    <div>
      {destination ? (
        <Chat
          destination={destination}
          messages={messages}
          isUnicast={isUnicast}
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
              connection,
            )
          }
          setMessages={setMessages}
          role={role}
          connection={connection}
          setConnection={setConnection}
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
