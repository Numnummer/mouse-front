import loadUnicastChatHistory from "./LoadUnicastChatHistory.js";

export default function onAuthorClick(
  email,
  setMessages,
  setDestination,
  setIsUnicast,
) {
  loadUnicastChatHistory(email).then((messages) => setMessages(messages));
  setDestination(email);
  setIsUnicast(true);
}
