import { userClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export default function getCurrentUserInfo() {
  let token = localStorage.getItem(authToken);

  return userClient
    .get("currentUserInfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 405 || error.response.status === 401) {
        localStorage.removeItem(authToken);
      }
    });
}
