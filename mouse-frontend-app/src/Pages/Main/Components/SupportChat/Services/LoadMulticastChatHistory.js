import { authToken } from "../../../../../Constants/LocalStorageItemKeys.js";
import { chatMessagesClient } from "../../../../../Constants/AxiosClients.js";

export function loadMulticastChatHistory(group) {
  const token = localStorage.getItem(authToken);
  return chatMessagesClient
    .get(`multicast/${group}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
