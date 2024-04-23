import axios from "axios";

export const backendOrigin = "https://localhost:7267";

export const userClient = axios.create({
  baseURL: `${backendOrigin}/api/User/`,
});

export const userProfileClient = axios.create({
  baseURL: `${backendOrigin}/api/UserProfile/`,
});

export const excerciseClient = axios.create({
  baseURL: `${backendOrigin}/api/Exercises/`,
});

export const trainingClient = axios.create({
  baseURL: `${backendOrigin}/api/Trainings/`,
});
