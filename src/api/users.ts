import { post, get } from "../utils/http/request";

interface LoginData {
    username: string,
    password: string
}

interface AccountData {
    accountName: string
}

//In this way, all user - related requests in the project can directly call these methods.
// If needed, can simply pass in the parameters without having to write a complete axios request.
export function login(data: LoginData) {
    return post("/login", data)
}

export function getMenu() {
    //The token is added to the request header in the request interceptor, 
    // so there's no need to include it as a parameter here.
    return get("/menu")
}

export function getAccountList(data: AccountData) {
    return post("/accountList", data)
}