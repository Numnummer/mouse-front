import { isValidSignInData } from "../../../CommonServices/ValidationService.js";
import { signIn } from "../../../Api/Auth/SignIn.js";
import {
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
  VERSION,
  VK_AUTHORIZATION_URI
} from "../../../Constants/Vk.js";

export function processSignIn(signInData) {
  return new Promise((resolve, reject) => {
    if (isValidSignInData(signInData)) {
      resolve(signIn(signInData));
    } else {
      reject("Invalid sign-in data");
    }
  });
}

export function processSignInByOtherService(service) {
  if (service === "Vk") {
    window.location.assign(
      `${VK_AUTHORIZATION_URI}authorize?client_id=${CLIENT_ID}&scope=${SCOPE}&response_type=${RESPONSE_TYPE}&v=${VERSION}&redirect_uri=${REDIRECT_URI}&scope=email`
    );
  }
}
