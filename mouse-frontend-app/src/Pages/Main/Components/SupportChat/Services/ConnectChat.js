import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {
  hubCunnectionUrl,
  onMessageReceiveName,
} from "../Constants/HubConnectionConstants";
import { authToken } from "../../../../../Constants/LocalStorageItemKeys";

export async function connectChat(onMessageReceive) {
  const chatConnection = new HubConnectionBuilder()
    .withUrl(hubCunnectionUrl, {
      accessTokenFactory: () => localStorage.getItem(authToken),
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem(authToken)}`,
      },
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();
  chatConnection.on(onMessageReceiveName, onMessageReceive);
  await chatConnection.start();
  return chatConnection;
}
