import { sendChatMessageMethodName } from "../Constants/SendChatMessageMethodName";

export default async function sendChatMessage(connection, messageText) {
  await connection.invoke(sendChatMessageMethodName, messageText);
}
