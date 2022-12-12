import { createSlice } from '@reduxjs/toolkit';

export const usuarioSlice = createSlice({
    name: 'usuario',
    initialState: {
        usuarios: [],
        errorMessage: undefined
    },
    reducers: {
        onAddNewUser: (state, { payload }) => {
            state.usuarios.push(payload);
        },
        onUpdateUser: (state, { payload }) => {
            state.usuarios.push(payload);
        },
        onError: (state, { payload }) => {
            state.errorMessage = payload
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        }
    }
});


export const { onAddNewUser, onUpdateUser, onError, clearErrorMessage } = usuarioSlice.actions