import { userClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export default function sendResetPasswordCode(email) {
  return userClient
    .post("sendResetPasswordCode", {
      email: email,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
