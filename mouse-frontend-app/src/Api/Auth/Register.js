import { userClient } from "../../Constants/AxiosClients.js";
import { signIn } from "./SignIn.js";

export function register(registerData) {
  return userClient
    .post("register", registerData)
    .then((response) => {
      if (response.data.result.succeeded) {
        let signInData = {
          email: registerData.email,
          password: registerData.password,
        };
        return signIn(signInData);
      }
    })
    .catch((error) => {
      throw new Error(error.response.data.title);
    });
}
