import axios from "axios";

export const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['USER-KEY'] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['USER-KEY'];
    }
};

export default axios.create({
    baseURL: "https://backendapi.turing.com/",
    responseType: "json"
})

