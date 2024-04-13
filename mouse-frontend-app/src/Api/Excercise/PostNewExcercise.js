import { excerciseClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export function postNewExcercise(excerciseData) {
  const token = localStorage.getItem(authToken);
  return excerciseClient
    .post("", excerciseData, {
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
