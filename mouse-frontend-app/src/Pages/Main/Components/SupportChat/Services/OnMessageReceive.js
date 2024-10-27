export default function onMessageReceive(
  author,
  text,
  date,
  messages,
  setMessages,
) {
  setMessages([
    ...messages,
    new {
      from: author,
      text: text,
      date: date,
      isFromSelf: false,
    }(),
  ]);
}
