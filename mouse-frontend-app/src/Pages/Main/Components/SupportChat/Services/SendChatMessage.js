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
  fileNames,
  filesContent,
) {
  if (isUnicast) {
    await connection.invoke(
      sendUnicastChatMessageMethodName,
      author,
      messageText,
      destination,
      fileNames,
      filesContent,
    );
  } else {
    await connection.invoke(
      sendMulticastChatMessageMethodName,
      author,
      messageText,
      destination,
      role,
      fileNames,
      filesContent,
    );
  }
}
