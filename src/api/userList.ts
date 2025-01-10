import { post } from "../utils/http/request";
import { DataType } from "../page/users/interface"

// The data type used when sending request on the tenant list page.
// In a real work environment, the format here needs to be determined based on the backend API documentation.
interface searchType {
    page: number,
    pageSize: number,
    //All fields in the form are of string type.
    companyName?: string,
    contact?: string,
    tel?: string
}

export function getUserList(data: searchType) {
    return post("/userList", data)
}

export function deleteUser(id: string) {
    return post("/deleteUser", { id })
}

export function batchDeleteUser(ids: React.Key[]) {
    return post("/batchDeleteUser", { ids })
}

export function editUser(data: DataType) {
    return post("/editUser", { data })
}