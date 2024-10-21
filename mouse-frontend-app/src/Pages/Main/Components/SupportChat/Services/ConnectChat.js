import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import {
  hubCunnectionUrl,
  onMessageReceiveName,
} from "../Constants/HubConnectionConstants";
import onMessageReceive from "./OnMessageReceive";

export async function connectChat() {
  const chatConnection = new HubConnectionBuilder()
    .withUrl(hubCunnectionUrl)
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();
  chatConnection.on(onMessageReceiveName, onMessageReceive);
  await chatConnection.start();
  return chatConnection;
}
