import { userClient } from "../../Constants/AxiosClients";

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
