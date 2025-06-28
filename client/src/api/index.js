import axios from "axios";
import {auth} from "../config/firebase.config"

let baseURL = "http://127.0.0.1:5001/project1-4062f/us-central1"

const api = axios.create({
    baseURL 
});

//function to validate the token and to get user data
export const validateToken = async () => {
    const token = await auth.currentUser.getIdToken(true);
    const response = await api.post('/validateToken', {}, {
        headers : {
            "Authorization" : `Bearer ${token}`
        },
    });
    return response.data;
};