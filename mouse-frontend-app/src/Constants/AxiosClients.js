import axios from "axios";

export const userClient=axios.create({
    baseURL:'https://localhost:7267/api/User/'
})

export const userProfileClient=axios.create({
    baseURL:'https://localhost:7267/api/UserProfile/'
})

export const excerciseClient=axios.create({
    baseURL:'https://localhost:7267/api/Exercise/'
})

export const trainingClient=axios.create({
    baseURL:'https://localhost:7267/api/Training/'
})