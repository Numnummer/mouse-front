import { isValidSignInData } from "../../../CommonServices/ValidationService.js";
import { signIn } from "../../../Api/Auth/SignIn.js";

export function processSignIn(signInData) {
  return new Promise((resolve, reject) => {
    if (isValidSignInData(signInData)) {
      resolve(signIn(signInData));
    } else {
      reject("Invalid sign-in data");
    }
  });
}

export function processSignInByOtherService(service) {}
