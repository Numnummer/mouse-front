import { userClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export default function getCurrentUserInfo() {
  let token = localStorage.getItem(authToken);
  const payload = JSON.parse(atob(token.split(".")[1]));
  console.log(token);
  console.log(payload);

  userClient
    .get("currentUserInfo", {
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
