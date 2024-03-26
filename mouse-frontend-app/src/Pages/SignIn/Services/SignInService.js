import { isValidSignInData } from "../../../CommonServices/ValidationService.js";
import { signIn } from "../../../Api/Auth/SignIn.js";

export function processSignIn(signInData) {
  if (isValidSignInData(signInData)) {
    return signIn(signInData);
  }
}

export function processSignInByOtherService(service) {}
