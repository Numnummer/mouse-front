import formatMessageDate from "./FormatDate.js";

export default function onMessageReceive(
  author,
  text,
  date,
  group,
  destination,
  setMessages,
  email,
) {
  if (author === email) return;
  switch (destination) {
    case "Пользователь":
      if (!group.includes("User")) {
        console.log(group);
        return;
      }
      break;
    case "Тренер":
      if (!group.includes("Coach")) {
        return;
      }
      break;
    case "Админ":
      if (!group.includes("Admin")) {
        return;
      }
      break;
  }
  const formattedDate = formatMessageDate(date);
  console.log(email);
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
