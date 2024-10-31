import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {
  addEmailMethodName,
  addToGroupByRoleMethodName,
  hubCunnectionUrl,
  onMessageReceiveName,
} from "../Constants/HubConnectionConstants";
import { authToken } from "../../../../../Constants/LocalStorageItemKeys";

export async function connectChat(onMessageReceive, role, email) {
  const token = localStorage.getItem(authToken);

  const chatConnection = new HubConnectionBuilder()
    .withUrl(hubCunnectionUrl, {
      accessTokenFactory: () => token,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();
  chatConnection.on(onMessageReceiveName, onMessageReceive);
  await chatConnection.start();
  await chatConnection.invoke(addToGroupByRoleMethodName, role);
  console.log(email);
  console.log(role);
  await chatConnection.invoke(addEmailMethodName, email);
  return chatConnection;
}
