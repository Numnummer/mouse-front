import {userClient} from "../../Constants/AxiosClients.js";

export function signIn(signInData){
    userClient.post('signIn', signInData)
        .then(result=> {
            let token = result.data.jwtToken
            localStorage.setItem('jwtToken',token)
        })
        .catch(
            error => {
                console.error(error);
            }
        )
}