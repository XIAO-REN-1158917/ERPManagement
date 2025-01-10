import http from "./http"

interface ApiResponse {
    code: number,
    message: string,
    data: any
}

//This approach further simplifies repetitive code during requests 
// and adds type validation to prevent incorrect data from being returned by the backend.
export function get(url: string, params?: any): Promise<ApiResponse> {
    return http.get(url, { params })//This is ES6 syntax, where the property name is the same as the value, so it can be abbreviated (e.g., {params: params}).
}

export function post(url: string, data?: any): Promise<ApiResponse> {
    return http.post(url, data)
    //This is axios syntax: get requires a property name, 
    // while data in post is an object and does not require a property name.
}