import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
//AxiosInstance,InternalAxiosRequestConfig and AxiosResponse are built-in types provided by axios.
import { message } from "antd";
import { store } from "../../store";

//Encapsulate the axios instance and add common configurations, such as the protocol and domain name.
const http: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000
})

//Request interceptors are used for common operations when sending requests, such as adding a token.
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {

    //Fetching token is a high-frequency event, and retrieving it from Redux instead of local storage
    // can reduce performance overhead.
    // this is not a component, can't 'useSelector'. There is a method in store to get state
    const { token } = store.getState().authSlice //ES6 Syntax — Destructuring Assignment

    // if there is a token, add to header
    if (token) {
        //Authorization is specifically used to carry authentication info
        // Bearer represents a type of authentication, followed by token
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
})

//Response interceptors are used for common operations when receiving responses, such as formatting error messages.
http.interceptors.response.use((response: AxiosResponse) => {
    const res = response.data
    if (res.code != 200) {//Defensive measure in case the request fails.
        message.error(res.code + ":" + res.message)//Use AntD components for a more polished appearance.
        return Promise.reject(new Error(res.message))
    }
    //Many of the data in the response are not needed, as the data(key name) already contains everything required. 
    // In practice, this should be decided based on the actual situation.
    return response.data
})

export default http