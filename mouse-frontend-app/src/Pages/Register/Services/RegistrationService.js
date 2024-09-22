import isValidRegistrationData from "../../../CommonServices/ValidationService.js";
import { register } from "../../../Api/Auth/Register.js";

export default function processRegistration(registrationData) {
  return new Promise((resolve, reject) => {
    if (isValidRegistrationData(registrationData)) {
      return register(registrationData)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject("Не валидные данные");
        });
    }
    reject("Не валидные данные");
  });
}
