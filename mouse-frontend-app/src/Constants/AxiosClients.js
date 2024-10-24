import axios from "axios";

//export const backendOrigin = "http://192.144.12.224:8080";
export const backendOrigin = "http://localhost:5049";

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

export const messagesClient = axios.create({
  baseURL: `${backendOrigin}/api/Message/`,
});
