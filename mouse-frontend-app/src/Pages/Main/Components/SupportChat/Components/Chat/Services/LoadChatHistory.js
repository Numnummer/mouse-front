import loadUnicastChatHistory from "./LoadUnicastChatHistory.js";
import { loadMulticastChatHistory } from "./LoadMulticastChatHistory.js";
import formatMessageDate from "../../../Services/FormatDate.js";

export default function loadChatHistory(
  isUnicast,
  destination,
  setMessages,
  email,
  role,
) {
  if (isUnicast) {
    loadUnicastChatHistory(destination).then((messages) => {
      const mappedMessages = messages.map((m) => ({
        from: m.senderEmail,
        text: m.messageText,
        date: formatMessageDate(m.sentDateTime),
        isFromSelf: email === m.senderEmail,
      }));
      setMessages(mappedMessages);
    });
  } else {
    let group;
    switch (destination) {
      case "Пользователь":
        if (role === "Coach") {
          group = "Coaches";
        } else {
          group = "Admins";
        }
        break;
      case "Тренер":
        if (role === "User") {
          group = "Users";
        } else {
          group = "Admins";
        }
        break;
      case "Админ":
        if (role === "User") {
          group = "Users";
        } else {
          group = "Coaches";
        }
        break;
    }
    loadMulticastChatHistory(group).then((messages) => {
      const mappedMessages = messages.map((m) => ({
        from: m.senderEmail.charAt(0).toLowerCase() + m.senderEmail.slice(1),
        text: m.messageText,
        date: formatMessageDate(m.sentDateTime),
        isFromSelf:
          email ===
          m.senderEmail.charAt(0).toLowerCase() + m.senderEmail.slice(1),
      }));
      setMessages(mappedMessages);
    });
  }
}
