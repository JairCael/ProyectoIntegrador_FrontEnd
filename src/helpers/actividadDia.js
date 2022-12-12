import { addDays, eachDayOfInterval, format, isFriday, isMonday, isThursday, isTuesday, isWednesday } from 'date-fns';
import asistenciaApi from '../api/asistenciaApi';


export const actividadDia = async (formulario) => {

    const { idActividad, idUsuario, dia, ingreso_actividad, salida_actividad, inicio_actividad, fin_actividad } = await formulario;

    const { data: dataUser } = await asistenciaApi.get(`/usuario/${idUsuario}`);
    const { usuario } = dataUser;

    const result = eachDayOfInterval({
        start: new Date(inicio_actividad),
        end: new Date(fin_actividad)
    })

    let fechas = [];
    let fechasFormat = [];
    let fechasFormat2 = [];
    let fechasDia = [];
    let fechasDiaFormat = [];

    result.map(fecha => {
        fechas.push(format(new Date(fecha), 'yyyy-MM-dd'));
    })

    fechas.map(fecha => {
        const result = addDays(new Date(fecha), 2)
        fechasFormat.push(result)
    })

    fechasFormat.map(fecha => {
        fechasFormat2.push(format(new Date(fecha), 'yyyy-MM-dd'))
    })

    for (const value of fechasFormat2) {
        const result = addDays(new Date(value), 1)

        if (dia === 'Lunes') {
            if (isMonday(new Date(result))) {
                fechasDia.push(result);
            }
        } else if (dia === 'Martes') {
            if (isTuesday(new Date(result))) {
                fechasDia.push(result);
            }
        }
        else if (dia === 'Miercoles') {
            if (isWednesday(new Date(result))) {
                fechasDia.push(result);
            }
        }
        else if (dia === 'Jueves') {
            if (isThursday(new Date(result))) {
                fechasDia.push(result);
            }
        } else {
            if (isFriday(new Date(result))) {
                fechasDia.push(result);
            }
        }
    }

    fechasDia.map(fecha => {
        fechasDiaFormat.push(format(new Date(fecha), 'yyyy-MM-dd'));
    })

    const { data } = await asistenciaApi.get('/feriado');
    const { feriados_All } = data;

    let feriados = [];

    feriados_All.map(feriado => {
        feriados.push(feriado.fecha);
    })

    if (usuario.tipo == 0) {
        fechasDiaFormat.map(fecha => {
            const { data } = asistenciaApi.post('/horario/crear', {
                idActividad,
                idUsuario,
                dia,
                fechaAsistencia: fecha
            });
        });
    }

    if (usuario.tipo == 1) {
        fechasDiaFormat.map(fecha => {
            if (!feriados.includes(fecha)) {
                const { data } = asistenciaApi.post('/horario/crear', {
                    idActividad,
                    idUsuario,
                    dia,
                    fechaAsistencia: fecha
                });
            }
        })
    }
}
