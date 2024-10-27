export default function onMessageReceive(
  author,
  text,
  date,
  messages,
  setMessages,
) {
  setMessages([
    ...messages,
    {
      from: author,
      text: text,
      date: date,
      isFromSelf: false,
    },
  ]);
}
