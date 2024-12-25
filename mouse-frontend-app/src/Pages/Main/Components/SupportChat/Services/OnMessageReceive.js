import formatMessageDate from "./FormatDate.js";

export default function onMessageReceive(
  author,
  text,
  date,
  destination,
  setMessages,
  email,
  fileNames,
) {
  if (author === email) return;

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
      fileNames: fileNames,
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
