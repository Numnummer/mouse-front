import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {
  hubCunnectionUrl,
  onMessageReceiveName,
} from "../Constants/HubConnectionConstants";
import { authToken } from "../../../../../Constants/LocalStorageItemKeys";

export async function connectChat(onMessageReceive) {
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
  return chatConnection;
}
