import sendChatMessage from "../../../../../Services/SendChatMessage.js";
import formatMessageDate from "../../../../../Services/FormatDate.js";

export default function onSendMessage(
  email,
  connection,
  setMessages,
  currentMessage,
  setCurrentMessage,
  destination,
  isUnicast,
  role,
  fileNames,
  filesContent,
) {
  if (currentMessage === "") {
    return;
  }
  sendChatMessage(
    email,
    connection,
    currentMessage,
    destination,
    isUnicast,
    role,
    fileNames,
    filesContent,
  );
  setMessages((prev) => [
    ...prev,
    {
      from: email,
      text: currentMessage,
      date: formatMessageDate(new Date()),
      isFromSelf: true,
    },
  ]);
  setCurrentMessage("");
}
