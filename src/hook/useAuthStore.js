import { useDispatch, useSelector } from "react-redux"
import asistenciaApi from "../api/asistenciaApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await asistenciaApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({
                nombre: data.nombre,
                email: data.email,
                idUsuario: data.idUsuario,
                actividad_usuario: data.actividad_usuario,
                idArea: data.idArea,
                tipo: data.tipo
            }))

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)
        }

    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await asistenciaApi.get('auth/renovar');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({
                nombre: data.nombre,
                email: data.email,
                idUsuario: data.idUsuario,
                actividad_usuario: data.actividad_usuario,
                idArea: data.idArea,
                tipo: data.tipo
            }))
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }


    return {
        //Propiedades
        status,
        user,
        errorMessage,

        //Métodos
        checkAuthToken,
        startLogin,
        startLogout
    }

}