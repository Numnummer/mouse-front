import formatMessageDate from "./FormatDate.js";

export default function onMessageReceive(author, text, date, setMessages) {
  const formattedDate = formatMessageDate(date);
  setMessages((prev) => [
    ...prev,
    {
      from: author,
      text: text,
      date: formattedDate,
      isFromSelf: false,
    },
  ]);
}
