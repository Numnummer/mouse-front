import { userClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export default function getCurrentUserInfo() {
  let token = localStorage.getItem(authToken);
  userClient
    .get("currentUserInfo", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch();
}
