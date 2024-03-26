import { userProfileClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export default function createProfile(userData) {
  let token = localStorage.getItem(authToken);
  const data = {
    gender: userData.gender,
    dateOfBirth: userData.dateOfBirth,
    phoneNumber: userData.phoneNumber,
    height: userData.height,
    weight: userData.weight,
  };
  return userProfileClient
    .post("", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 405 || error.response.status === 401) {
        localStorage.removeItem(authToken);
      }
    });
}
