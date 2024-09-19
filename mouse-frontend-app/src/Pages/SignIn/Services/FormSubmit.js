import { processSignIn } from "./SignInService.js";

export default function onFormSubmit(event, signInData, navigate, toast) {
  event.preventDefault();
  processSignIn(signInData)
    .then(() => {
      navigate("Main");
    })
    .catch((error) => {
      console.log(error);
      toast.error(error, { autoClose: 2000 });
    });
}
