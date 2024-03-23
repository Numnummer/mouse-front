import {userClient} from "../../Constants/AxiosClients.js";
import { authToken } from "../../Constants/LocalStorageItemKeys.js";

export function signIn(signInData){
    userClient.post('signIn', signInData)
        .then(result=> {
            let token = result.data.jwtToken
            localStorage.setItem(authToken,token)
        })
        .catch(
            error => {
                console.error(error);
            }
        )
}