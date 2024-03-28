import isValidRegistrationData from "../../../CommonServices/ValidationService.js";
import { register } from "../../../Api/Auth/Register.js";

export default function processRegistration(registrationData) {
  return new Promise((resolve, reject) => {
    if (isValidRegistrationData(registrationData)) {
      return register(registrationData).catch((error) => {
        reject(error);
      });
    }
    throw new Error("Не валидные данные");
  });
}
