export default async function sendMessage(
  currentUserId,
  messageText,
  connection
) {
  await connection.invoke("SendMessage", messageText, currentUserId);
}
