import { userClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export default function checkUserProfile() {
  let token = localStorage.getItem(authToken);
  return userClient
    .get(`checkUserProfile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
