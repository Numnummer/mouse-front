import { userClient } from "../../Constants/AxiosClients";

export default function restorePassword(email, password, code) {
  return userClient
    .post("resetPassword", {
      email: email,
      password: password,
      code: code,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}
