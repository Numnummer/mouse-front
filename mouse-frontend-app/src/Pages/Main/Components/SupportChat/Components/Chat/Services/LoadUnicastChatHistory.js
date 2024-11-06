import { authToken } from "../../../../../../../Constants/LocalStorageItemKeys.js";
import { chatMessagesClient } from "../../../../../../../Constants/AxiosClients.js";

export default function loadUnicastChatHistory(fromEmail, toEmail) {
  const token = localStorage.getItem(authToken);
  return chatMessagesClient
    .get(`unicast/${fromEmail}/${toEmail}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
