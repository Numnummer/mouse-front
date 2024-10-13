import { excerciseClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export function deleteExcercise(excerciseId) {
  const token = localStorage.getItem(authToken);
  return excerciseClient
    .delete(`${excerciseId}`, {
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
