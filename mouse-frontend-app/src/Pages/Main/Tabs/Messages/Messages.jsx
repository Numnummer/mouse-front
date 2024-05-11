import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect } from "react";
import { hubConnectionUrl } from "../../../../Constants/Messages";

export default function Messages({ currentTab }) {
  useEffect(() => {
    const chatConnection = new HubConnectionBuilder()
      .withUrl(hubConnectionUrl)
      .build();
  }, [currentTab]);
  return <div className="user-page-container"></div>;
}
