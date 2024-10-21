import React, { useEffect, useState } from "react";
import Chat from "./Components/Chat/Chat";
import ChooseDestination from "./Components/ChooseDestination/ChooseDestination";
import { loadChatHistory } from "./Services/LoadChatHistory";

export default function SupportChat() {
  const [destination, setDestination] = useState();
  const [messages, setMessages] = useState();
  useEffect(() => {
    loadChatHistory().then((messages) => {
      setMessages(messages);
    });
  }, []);
  return (
    <div>
      {destination ? (
        <Chat messages={messages}></Chat>
      ) : (
        <ChooseDestination setDestination={setDestination}></ChooseDestination>
      )}
    </div>
  );
}
