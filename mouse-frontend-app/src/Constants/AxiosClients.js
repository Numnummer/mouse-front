import axios from "axios";

//export const backendOrigin = "http://backend:80";
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

export const chatMessagesClient = axios.create({
  baseURL: `${backendOrigin}/api/SupportChat/`,
});
