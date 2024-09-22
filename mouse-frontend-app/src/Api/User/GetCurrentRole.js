import { userClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export default function getCurrentRole() {
  let token = localStorage.getItem(authToken);
  return userClient
    .get("currentRole", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
}
