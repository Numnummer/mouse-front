import {
  sendMulticastChatMessageMethodName,
  sendUnicastChatMessageMethodName,
} from "../Constants/SendChatMessageMethodName.js";

export default async function sendChatMessage(
  connection,
  messageText,
  destination,
  isUnicast,
) {
  if (isUnicast) {
    await connection.invoke(
      sendUnicastChatMessageMethodName,
      messageText,
      destination,
    );
  } else {
    await connection.invoke(
      sendMulticastChatMessageMethodName,
      messageText,
      destination,
    );
  }
}
