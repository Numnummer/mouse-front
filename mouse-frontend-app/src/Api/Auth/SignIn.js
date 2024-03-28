import { userClient } from "../../Constants/AxiosClients.js";
import { authToken, userIdItem } from "../../Constants/LocalStorageItemKeys.js";
import getCurrentUserInfo from "../User/GetCurrentUserInfo.js";

export function signIn(signInData) {
  localStorage.removeItem(authToken);
  return userClient
    .post("signIn", signInData)
    .then((result) => {
      let token = result.data.jwtToken;
      console.log(token);
      localStorage.setItem(authToken, token);
      localStorage.setItem(userIdItem, result.data.userId);
      return true;
    })
    .catch((error) => {
      throw new Error(error.response.data.title);
    });
}
