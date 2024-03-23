import { userClient } from "../../Constants/AxiosClients.js";
import { authToken } from "../../Constants/LocalStorageItemKeys.js";
import getCurrentUserInfo from "../User/GetCurrentUserInfo.js";

export function signIn(signInData) {
  userClient
    .post("signIn", signInData)
    .then((result) => {
      let token = result.data.jwtToken;
      console.log(token);
      localStorage.setItem(authToken, token);
      //getCurrentUserInfo();
    })
    .catch((error) => {
      console.error(error);
    });
}
