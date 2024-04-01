import { userClient } from "../../Constants/AxiosClients.js";
import { authToken, userIdItem } from "../../Constants/LocalStorageItemKeys.js";
import getCurrentUserInfo from "../User/GetCurrentUserInfo.js";

export function signIn(signInData) {
  localStorage.removeItem(authToken);
  localStorage.removeItem(userNameItem);
  localStorage.removeItem(userIdItem);
  return userClient
    .post("signIn", signInData)
    .then((result) => {
      let token = result.data.jwtToken;
      localStorage.setItem(authToken, token);
      localStorage.setItem(userIdItem, result.data.userId);
      localStorage.setItem(userNameItem, result.data.firstName);
      return true;
    })
    .catch((error) => {
      throw new Error(error.response.data.title);
    });
}
