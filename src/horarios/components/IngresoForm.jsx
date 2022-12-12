import { differenceInMinutes, format } from "date-fns";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import asistenciaApi from "../../api/asistenciaApi";
import { useForm } from "../../hook/useForm";

const horarioFormFields = {
    horarioEmail: '',
    horarioPassword: '',
}

export const IngresoForm = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [horarioFind, setHorarioFind] = useState(null);
    const [usuarioFind, setUsuarioFind] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const { data } = await asistenciaApi.get(`/horario/${id}`);
            setHorarioFind(data.horario);
            const { data: data2 } = await asistenciaApi.get(`/usuario/${data.horario.idUsuario}`);
            setUsuarioFind(data2.usuario)
        })();
    }, [id])

    const h1 = useRef();

    const ti = () => {
        let fechahora = new Date();
        let hora = fechahora.getHours();
        let minuto = fechahora.getMinutes();
        let segundo = fechahora.getSeconds();
        let minutoFormat;
        let segundoFormat;

        if (minuto < 10) {
            minutoFormat = `0${minuto}`
        } else {
            minutoFormat = minuto;
        }
        if (segundo < 10) {
            segundoFormat = `0${segundo}`
        } else {
            segundoFormat = segundo;
        }
        return `${hora}:${minutoFormat}:${segundoFormat}`;
    };
    useEffect(() => {
        const cl = setInterval(() => {
            h1.current.innerHTML = `${ti()}`;
        }, 1000);
        return () => clearInterval(cl);
    }, []);

    const { horarioPassword, onInputChange } = useForm(horarioFormFields);

    let fechaActual = format(new Date(), 'yyyy-MM-dd');
    let fechaActualSplit = fechaActual.split('-');
    let horaMarcada = ti();
    let horaMarcadaSplit = horaMarcada.split(':');

    let hora_ingreso = horarioFind?.actividad.ingreso_actividad;

    const marcadoHorarioSubmit = async (e) => {
        e.preventDefault();

        try {
            const { idHorarioAsistencia } = horarioFind;

            let horaMarcada = ti();
            let horaMarcadaSplit = horaMarcada.split(':');

            let horaIngresoSplit = hora_ingreso.split(':');

            const marcarAsistencia = differenceInMinutes(
                new Date(fechaActualSplit[0], parseInt(fechaActualSplit[1]) - 1, fechaActualSplit[2], horaIngresoSplit[0], horaIngresoSplit[1], horaIngresoSplit[2]),
                new Date(fechaActualSplit[0], parseInt(fechaActualSplit[1]) - 1, fechaActualSplit[2], horaMarcadaSplit[0], horaMarcadaSplit[1], horaMarcadaSplit[2])
            )

            if (marcarAsistencia <= 14 && marcarAsistencia >= 0) {
                const { data } = await asistenciaApi.post(`/horario/marcar/${idHorarioAsistencia}`, {
                    email: usuarioFind.email, password: horarioPassword, hora_ingreso: horaMarcada, horarioFind: horarioFind.idHorarioAsistencia, estado: 1
                })
                Swal.fire(`Ud. ingresó en el tiempo correspondiente. ¡Felicitaciones!`);
                navigate(`/horarios`);
            } else if (marcarAsistencia <= 0 && marcarAsistencia >= -15) {
                const { data } = await asistenciaApi.post(`/horario/marcar/${idHorarioAsistencia}`, {
                    email: usuarioFind.email, password: horarioPassword, hora_ingreso: horaMarcada, horarioFind: horarioFind.idHorarioAsistencia, estado: 1
                })
                Swal.fire(`Ud. ingresó ${parseInt(marcarAsistencia) * -1} minuto(s) después. *Normal*`);
                navigate(`/horarios`);
            } else if (marcarAsistencia <= -14 && marcarAsistencia >= -29) {
                const { data } = await asistenciaApi.post(`/horario/marcar/${idHorarioAsistencia}`, {
                    email: usuarioFind.email, password: horarioPassword, hora_ingreso: horaMarcada, horarioFind: horarioFind.idHorarioAsistencia, estado: 2
                })
                Swal.fire(`Ud. ingresó ${parseInt(marcarAsistencia) * -1} minuto(s) después. *Tardanza*`);
                navigate(`/horarios`);
            } else {
                const { data } = await asistenciaApi.post(`/horario/marcar/${idHorarioAsistencia}`, {
                    email: usuarioFind.email, password: horarioPassword, horarioFind: horarioFind.idHorarioAsistencia, estado: 3
                })
                Swal.fire('Se excedió el tiempo límite');
                navigate(`/horarios`);
            }


        } catch (error) {
            setErrorMessage('La contraseña es incorrecta');
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000)
            return;
        }
    }

    return (

        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">

            <div className='my-8 mr-60'>
                <Link to="/horarios" className='px-3 py-2 rounded-xl text-white bg-green-600'>Volver a listado</Link>
            </div>

            <div className=" bg-pink-600 flex justify-center w-96 py-3 rounded-xl mb-3">
                <h1 className="text-4xl text-white" ref={h1}>{ti()}</h1>
            </div>

            <div className='relative w-5/6 md:w-3/6 lg:w-2/6 xl:w-96 border p-5 rounded-xl bg-white'>

                <div className='text-center mt-5 mb-10 flex justify-center'>
                    <h2 className='text-2xl uppercase font-extrabold'>Marcado de asistencia</h2>
                </div>
                <form onSubmit={marcadoHorarioSubmit} className="px-3">
                    <div className='mb-8'>
                        <label className='block text-sm mb-2 font-semibold'>Email</label>
                        <input className="w-full text-sm py-1 border-b-2 border-gray-600 transition-colors duration-500 focus:outline-none focus:border-blue-600"
                            type="email"
                            name="horarioEmail"
                            value={usuarioFind.email}
                            disabled={true}
                            onChange={onInputChange}
                            autoComplete="false"
                        />
                    </div>
                    <div className='mb-8'>
                        <label className='block text-sm mb-2 font-semibold'>Password</label>
                        <input className="w-full text-sm py-1 border-b-2 border-gray-600 transition-colors duration-500 focus:outline-none focus:border-blue-600"
                            type="password"
                            name="horarioPassword"
                            value={horarioPassword}
                            onChange={onInputChange}
                            autoComplete="false"
                        />
                    </div>

                    {errorMessage
                        && <div className="flex p-4 mb-4 bg-red-100 rounded-md border-t-4 border-red-500 dark:bg-red-200" role="alert">
                            <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <div className="ml-3 text-sm font-medium text-red-700">
                                La contraseña es incorrecta
                            </div>
                        </div>
                    }

                    <button className='w-full text-center text-white text-lg font-bold p-3 rounded-xl mb-3 duration-500 bg-blue-600 hover:bg-blue-700'
                        type='submit'>
                        Marcar ingreso
                    </button>

                </form>
            </div>
        </div>

    );
}