import { userProfileClient } from "../../Constants/AxiosClients";
import { authToken, userIdItem } from "../../Constants/LocalStorageItemKeys";

export default function getUserProfile() {
  let userId = localStorage.getItem(userIdItem);
  let token = localStorage.getItem(authToken);

  userProfileClient
    .get(userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.removeItem(authToken);
      }
    });
}
