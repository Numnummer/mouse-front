import {userClient} from "../../Constants/AxiosClients.js";

export function register(registerData){
    userClient.post('register',registerData)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}