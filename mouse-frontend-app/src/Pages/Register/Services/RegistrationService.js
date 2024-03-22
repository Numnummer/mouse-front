import isValidRegistrationData from "../../../CommonServices/ValidationService.js";
import {register} from "../../../Api/Registration/Register.js";

export default function processRegistration(registrationData){
    console.log(registrationData)
    if (isValidRegistrationData(registrationData)){
        console.log(registrationData)
        register(registrationData)
    }
}