import sendResetPasswordCode from "../../Api/Auth/GetCode";
import restorePassword from "../../Api/Auth/ResetPassword";

export function getCode(email) {
  return sendResetPasswordCode(email);
}
export function resetPassword(email, password, code) {
  return restorePassword(email, password, code);
}
