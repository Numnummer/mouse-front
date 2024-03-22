import {userClient} from "../../Constants/AxiosClients.js";
import {signIn} from "./SignIn.js";

export function register(registerData){
    userClient.post('register',registerData)
        .then(response => {
            if (response.data.result.succeeded){
                let signInData={
                    email:registerData.email,
                    password:registerData.password
                }
                signIn(signInData)
            }
        })
        .catch(error => {
            console.error(error);
        });
}