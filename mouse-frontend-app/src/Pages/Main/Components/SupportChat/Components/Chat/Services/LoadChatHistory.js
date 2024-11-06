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
    loadUnicastChatHistory(email, destination).then((messages) => {
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
    switch (destination + " " + role) {
      case "Пользователь Coach":
        group = "UserCoach";
        break;
      case "Пользователь Administrator":
        group = "UserAdmin";
        break;
      case "Тренер User":
        group = "UserCoach";
        break;
      case "Тренер Administrator":
        group = "CoachAdmin";
        break;
      case "Админ User":
        group = "UserAdmin";
        break;
      case "Админ Coach":
        group = "CoachAdmin";
        break;
    }
    loadMulticastChatHistory(group).then((messages) => {
      const mappedMessages = messages.map((m) => ({
        from: m.senderEmail,
        text: m.messageText,
        date: formatMessageDate(m.sentDateTime),
        isFromSelf: email === m.senderEmail,
      }));
      setMessages(mappedMessages);
    });
  }
}
