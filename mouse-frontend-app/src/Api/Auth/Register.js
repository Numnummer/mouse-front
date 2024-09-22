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
      return new Promise((_, reject) => {
        reject(response.data.result.errors[0].code);
      });
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.response.data.title);
    });
}
