import { excerciseClient, trainingClient } from "../../Constants/AxiosClients";
import { authToken } from "../../Constants/LocalStorageItemKeys";

export function postNewExcerciseOnTraining(trainingId, excerciseData) {
  const token = localStorage.getItem(authToken);
  console.log(excerciseData)
  const data = [];

  data.push(excerciseData.id);

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
}

export function postNewExcercise(excerciseData) {
  const token = localStorage.getItem(authToken);
  return excerciseClient
    .post("", excerciseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
}