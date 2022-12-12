import asistenciaApi from '../api/asistenciaApi';

export const useFeriado = () => {

    const startSavingFeriado = async (formulario) => {

        try {
            const { data } = await asistenciaApi.post('/feriado/registro', formulario);
        } catch (error) {
            console.log(error);
        }
    }

    const startUpdateFeriado = async (formulario) => {

        try {
            const { data } = await asistenciaApi.put(`/feriado/editar/${formulario.idFeriado}`, formulario);
        } catch (error) {
            console.log(error);
        }
    }



    return {
        //Métodos
        startSavingFeriado,
        startUpdateFeriado
    }
}
