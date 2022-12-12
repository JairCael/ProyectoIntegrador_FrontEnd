import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { usuarioSlice } from "./usuario/usuarioSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        usuario: usuarioSlice.reducer
    }
})