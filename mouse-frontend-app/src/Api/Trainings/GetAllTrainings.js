import { trainingClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export function getAllTrainings() {
  const token = localStorage.getItem(authToken);
  return trainingClient
    .get("", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
}
