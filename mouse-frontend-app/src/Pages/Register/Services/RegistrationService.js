import isValidRegistrationData from "../../../CommonServices/ValidationService.js";
import { register } from "../../../Api/Auth/Register.js";

export default function processRegistration(registrationData) {
  if (isValidRegistrationData(registrationData)) {
    return register(registrationData);
  }
}
