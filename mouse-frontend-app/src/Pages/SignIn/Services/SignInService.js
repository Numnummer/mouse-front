import { isValidSignInData } from "../../../CommonServices/ValidationService.js";
import { signIn } from "../../../Api/Auth/SignIn.js";
import { clientId, redirectUri } from "../../../Constants/Vk.js";

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
      `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}`
    );
  }
}
