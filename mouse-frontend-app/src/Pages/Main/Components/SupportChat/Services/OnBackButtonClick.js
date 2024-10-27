import { loadMulticastChatHistory } from "./LoadMulticastChatHistory.js";

export default function onBackButtonClick(
  groupDestination,
  setMessages,
  setIsUnicast,
  setDestination,
) {
  loadMulticastChatHistory(groupDestination).then((messages) => {
    setMessages(messages);
  });
  setDestination(groupDestination);
  setIsUnicast(false);
}
