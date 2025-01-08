import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./login/authSlice";
import userSlice from "./user/userSlice";
import contractSlice from "./finance/contractSlice";

//Since authSlice, userSlice, and contractSlice each default export their
// respective reducers, they can be written this way.
export const store = configureStore({
    reducer: {
        authSlice, // equal to authSlice: authSlice.reducer
        userSlice, // userSlice: userSlice.reducer
        contractSlice // contractSlice: contractSlice.reducer
    }
})