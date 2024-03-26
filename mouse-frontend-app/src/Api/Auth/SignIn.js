import { userClient } from "../../Constants/AxiosClients.js";
import { authToken, userIdItem } from "../../Constants/LocalStorageItemKeys.js";
import getCurrentUserInfo from "../User/GetCurrentUserInfo.js";

export function signIn(signInData) {
  return userClient
    .post("signIn", signInData)
    .then((result) => {
      let token = result.data.jwtToken;
      localStorage.setItem(authToken, token);
      localStorage.setItem(userIdItem, result.data.userId);
    })
    .catch((error) => {
      console.error(error);
    });
}
