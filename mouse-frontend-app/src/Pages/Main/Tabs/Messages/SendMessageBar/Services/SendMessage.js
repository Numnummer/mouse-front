export default async function sendMessage(userId, message, connection) {
        await connection.invoke("SendMessage", message, userId.toString());
}
