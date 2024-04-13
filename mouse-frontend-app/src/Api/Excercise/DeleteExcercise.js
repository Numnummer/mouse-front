import { excerciseClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export function deleteExcercise(excerciseId) {
  const token = localStorage.getItem(authToken);
  excerciseClient
    .delete(`${excerciseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
