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
        console.log("removed");
      }
    });
}

export function getCurrentUserInfo1() {
  let token = localStorage.getItem(authToken);
  const url = "http://localhost:5049/api/User/currentUserInfo";

  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
