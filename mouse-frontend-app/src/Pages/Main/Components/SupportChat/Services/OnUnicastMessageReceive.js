import onMessageReceive from "./OnMessageReceive.js";

export default function onUnicastMessageReceive(
  author,
  text,
  date,
  isUnicast,
  destination,
  setMessages,
  email,
) {
  if (!isUnicast) return;
  onMessageReceive(author, text, date, destination, setMessages, email);
}
