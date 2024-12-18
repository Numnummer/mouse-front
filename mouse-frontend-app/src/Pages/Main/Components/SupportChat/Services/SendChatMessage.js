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
    console.log(connection);
    console.log(author);
    console.log(messageText);
    console.log(destination);
    console.log(role);
    console.log(fileNames);
    console.log(filesContent);
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
