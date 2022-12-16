import axios from "axios";

const asistenciaApi = axios.create({
    baseURL: 'https://asistencia-cael-api.onrender.com/api'
})

//TODO: configurar interceptores
asistenciaApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default asistenciaApi;