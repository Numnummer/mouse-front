import {
  sendMulticastChatMessageMethodName,
  sendUnicastChatMessageMethodName,
} from "../Constants/SendChatMessageMethodName.js";

export default async function sendChatMessage(
  author,
  connection,
  messageText,
  destination,
  isUnicast,
  role,
) {
  if (isUnicast) {
    await connection.invoke(
      sendUnicastChatMessageMethodName,
      author,
      messageText,
      destination,
    );
  } else {
    await connection.invoke(
      sendMulticastChatMessageMethodName,
      author,
      messageText,
      destination,
      role,
    );
  }
}
