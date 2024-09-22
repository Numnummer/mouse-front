import { trainingClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export function deleteTraining(id) {
  const token = localStorage.getItem(authToken);
  return trainingClient
    .delete(`${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
}
