// -------------------------------------------------------------------Imports-----------------------------------------------------------
import axios from "axios";
// -------------------------------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------Interceptor Configuration--------------------------------------------------

// instance -- instance of the axios in order to do the api call
export const instance = axios.create({
    baseURL: "https://retoolapi.dev"
})


// request config
instance.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response config
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        return Promise.reject(error);
    }
);
