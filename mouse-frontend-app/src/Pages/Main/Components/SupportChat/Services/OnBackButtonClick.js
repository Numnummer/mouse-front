import { loadMulticastChatHistory } from "../Components/Chat/Services/LoadMulticastChatHistory.js";

export default function onBackButtonClick(
  groupDestination,
  setMessages,
  setIsUnicast,
  setDestination,
  isUnicast,
) {
  if (isUnicast) {
    loadMulticastChatHistory(groupDestination).then((messages) => {
      setMessages(messages);
    });
    setDestination(groupDestination);
    setIsUnicast(false);
  } else {
    setDestination(undefined);
  }
}
