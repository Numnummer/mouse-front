import {backendOrigin} from "./AxiosClients.js";


export const CLIENT_ID = "51816062";
export const VERSION = "5.131";
export const SCOPE = "email";
export const RESPONSE_TYPE = "code";
export const REDIRECT_URI = `${backendOrigin}/api/User/registerWithVk`;
export const VK_AUTHORIZATION_URI = "https://oauth.vk.com/";
