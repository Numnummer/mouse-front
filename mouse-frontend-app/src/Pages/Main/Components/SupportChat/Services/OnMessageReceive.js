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
  setMessages((prev) => {
    // Получаем последний элемент в предыдущем состоянии
    const lastMessage = prev[prev.length - 1];

    // Проверяем, совпадают ли поля с новым сообщением
    const newMessage = {
      from: author,
      text: text,
      date: formattedDate,
      isFromSelf: false,
    };

    // Если последний элемент и новое сообщение не совпадают, добавляем его в массив
    if (
      !lastMessage ||
      lastMessage.from !== newMessage.from ||
      lastMessage.text !== newMessage.text ||
      lastMessage.date !== newMessage.date
    ) {
      return [...prev, newMessage];
    }

    // Если совпадающие поля, возвращаем предыдущее состояние без изменений
    return prev;
  });
}
