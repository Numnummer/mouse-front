import { userClient } from "../../Constants/AxiosClients.js";
import {
  authToken,
  userIdItem,
  userNameItem,
} from "../../Constants/LocalStorageItemKeys.js";

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
      console.log(result);
      return true;
    })
    .catch((error) => {
      throw new Error(error.response.data.title);
    });
}
