import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: sessionStorage.getItem("token") || null,
        menuList: []
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload//save token to redux
            sessionStorage.setItem("token", action.payload)//save token to local
        },
        clearToken: state => {
            state.token = null
            sessionStorage.removeItem("token")
        },
        setMenu: (state, action) => {
            state.menuList = action.payload
        }
    }
})

//setToken, clearToken and setMenu are action creators
//It can generate the corresponding action based on the given parameters,
// locate the appropriate slice and reducer, and trigger it using dispatch.
// For example: 
// dispatch(setToken("newToken"))
// const action = setToken("newToken")
// action = {
//    type:"auth/setToken",
//    payload:"newToken"
//}
export const { setToken, clearToken, setMenu } = authSlice.actions
export default authSlice.reducer