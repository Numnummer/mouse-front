import { messagesClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export default function getMessages() {
  let token = localStorage.getItem(authToken);
  return messagesClient
    .get("messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
}
