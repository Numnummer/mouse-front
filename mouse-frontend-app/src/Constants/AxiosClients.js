import axios from "axios";

export const backendOrigin = "http://localhost:5049";

export const userClient = axios.create({
  baseURL: `${backendOrigin}/api/User/`,
});

export const userProfileClient = axios.create({
  baseURL: `${backendOrigin}/api/UserProfile/`,
});

export const excerciseClient = axios.create({
  baseURL: `${backendOrigin}/api/Exercise/`,
});

export const trainingClient = axios.create({
  baseURL: `${backendOrigin}/api/Training/`,
});
