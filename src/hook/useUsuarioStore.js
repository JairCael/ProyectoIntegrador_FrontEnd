import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import asistenciaApi from '../api/asistenciaApi';
import { clearErrorMessage, onAddNewUser, onError } from '../store/usuario/usuarioSlice';

export const useUsuarioStore = () => {

    const dispatch = useDispatch();
    const { usuarios, errorMessage } = useSelector(state => state.usuario);

    const startSavingUser = async (formulario) => {

        try {
            const { data } = await asistenciaApi.post('/usuario/registro', formulario);
            dispatch(onAddNewUser(formulario));
        } catch (error) {
            dispatch(onError(error.response.data?.msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)
        }
    }

    const startUpdateUser = async (formulario) => {
        try {
            const { data } = await asistenciaApi.put(`/usuario/editar/${formulario.idUsuario}`, formulario);
        } catch (error) {
            dispatch(onError(error.response.data?.msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)
        }
    }



    return {

        //Propiedades
        usuarios,
        errorMessage,


        //Métodos
        startSavingUser,
        startUpdateUser
    }
}
