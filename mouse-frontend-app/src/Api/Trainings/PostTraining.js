import { trainingClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export function postTraining(trainingData) {
  const token = localStorage.getItem(authToken);
  return trainingClient
    .post("", trainingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(error);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
}
