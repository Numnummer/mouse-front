import { userProfileClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export default function updateProfile(userData) {
  let token = localStorage.getItem(authToken);
  const data = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    gender: userData.gender === "Мужчина" ? 0 : 1,
    dateOfBirth: userData.dateOfBirth,
    phoneNumber: userData.phoneNumber,
    height: userData.height,
    weight: userData.weight,
  };
  console.log(data);
  return userProfileClient
    .put("", data, {
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