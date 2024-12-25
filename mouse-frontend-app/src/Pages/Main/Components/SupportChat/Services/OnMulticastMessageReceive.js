import onMessageReceive from "./OnMessageReceive.js";

export default function onMulticastMessageReceive(
  author,
  text,
  date,
  group,
  destination,
  setMessages,
  email,
  fileNames,
) {
  if (group) {
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
  }
  onMessageReceive(
    author,
    text,
    date,
    destination,
    setMessages,
    email,
    fileNames,
  );
}
