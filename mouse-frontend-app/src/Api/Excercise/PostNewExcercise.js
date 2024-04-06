import { excerciseClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export function postNewExcercise(excerciseData) {
  const token = localStorage.getItem(authToken);
  excerciseClient.post("", excerciseData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
