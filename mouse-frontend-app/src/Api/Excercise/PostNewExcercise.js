import { excerciseClient, trainingClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export function postNewExcercise(trainingId, excerciseData) {
  const token = localStorage.getItem(authToken);
  return excerciseClient
    .post("", excerciseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const data = [];
      data.push(response.data.exerciseId);
      console.log(data);
      return trainingClient
        .post(`${trainingId}/addExercises`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response1) => {
          console.log(response1);
          return response1;
        })
        .catch((error) => {
          console.log(error);
          throw new Error(error);
        });
    })
    .catch((error) => {
      throw new Error(error);
    });
}
