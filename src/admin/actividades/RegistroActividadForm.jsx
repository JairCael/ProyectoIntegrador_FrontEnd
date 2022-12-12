import React, { useEffect } from 'react'
import { useState } from 'react'
import asistenciaApi from '../../api/asistenciaApi'
import { useAuthStore } from '../../hook/useAuthStore'
import { useForm } from '../../hook/useForm'
import { RegistroActividadExcel } from './RegistroActividadExcel'
import { useActividadStore } from '../../hook/useActividadStore'

/* UUID */
import uuid from 'react-uuid'

/* Date FNS */
import { isAfter } from 'date-fns'

const registerForm = {
    idUsuario: '',
    dia: '',
    ingreso_actividad: '',
    salida_actividad: '',
    inicio_actividad: '',
    fin_actividad: '',
}

export const RegistroActividadForm = ({ usuarios }) => {

    const { user } = useAuthStore();

    const [idUsuarioForm, setidUsuarioForm] = useState('');
    const [diaForm, setDiaForm] = useState('');

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const { startSavingActividad } = useActividadStore();

    const [actividades, setActividades] = useState(null);

    const obtenerActividades = async () => {
        const { data } = await asistenciaApi.get('actividad/');
        setActividades(data.actividades_All);
    }

    let fecha = new Date();
    let fechaLocalActual = fecha.toLocaleString();
    let fechaLocalActualSplit = fechaLocalActual.split(',');
    let fechaHoy = fechaLocalActualSplit[0].replaceAll('/', '-');
    let fechas = fechaHoy.split('-').reverse();
    let fechaActual = fechas[0] + '-' + fechas[1] + '-' + fechas[2]

    useEffect(() => {
        obtenerActividades();
    }, [])

    const { idUsuario, dia, ingreso_actividad, salida_actividad, inicio_actividad, fin_actividad, onInputChange, onResetForm } = useForm(registerForm);

    const registroSubmit = (e) => {

        e.preventDefault();

        const id_actividad = uuid();

        const idUsuario_val = document.getElementById('idUsuario').value;
        const dia_val = document.getElementById('dia').value;

        const compararFechas = isAfter(new Date(inicio_actividad), new Date(fin_actividad));

        for (let i = 0; i <= actividades.length; i++) {
            if (idUsuario_val === '-1' || dia_val === '-1' || !ingreso_actividad || !salida_actividad || !inicio_actividad || !fin_actividad) {
                setError('Todos los campos son obligatorios.');
                setTimeout(() => {
                    setError(null);
                }, 3000)
                return;
            } else if (ingreso_actividad < '08:00' || salida_actividad > '23:59') {
                setError('El horario de trabajo es de 8:00 a.m. a 11:59 p.m.');
                setTimeout(() => {
                    setError(null);
                }, 3000)
                return;
            } else if (ingreso_actividad >= salida_actividad) {
                setError('Ingrese un horario correcto.');
                setTimeout(() => {
                    setError(null);
                }, 3000)
                return;
            } else if (compararFechas) {
                setError('La fecha fin tiene que ser superior a la del inicio.');
                setTimeout(() => {
                    setError(null);
                }, 3000)
                return;
            } else if (actividades[i]?.idUsuario == idUsuario_val && actividades[i]?.dia == dia_val && actividades[i]?.salida_actividad > ingreso_actividad && actividades[i].fin_actividad > inicio_actividad) {
                setError('El horario indicado se cruza con otra actividad.');
                setTimeout(() => {
                    setError(null);
                }, 3000)
                return;
            } else {
                startSavingActividad({
                    idActividad: id_actividad, idUsuario: idUsuarioForm, dia: diaForm, ingreso_actividad: ingreso_actividad,
                    salida_actividad: salida_actividad, inicio_actividad: inicio_actividad,
                    fin_actividad: fin_actividad, createdByUser: user.idUsuario
                })
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 3000)

                onResetForm();
                setidUsuarioForm('');
                setDiaForm('');
            }
        }
    }

    return (
        <>
            <section className="w-5/6 p-6 mx-auto bg-white rounded-md">

                <RegistroActividadExcel />

                <form onSubmit={registroSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-800">Empleado</label>
                            <select className="form-select appearance-none block w-full px-4 py-2 mt-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                                id="idUsuario"
                                value={idUsuarioForm}
                                onChange={e => setidUsuarioForm(e.target.value)}
                            >
                                <option value="-1">Seleccione un empleado</option>
                                {usuarios.map(({ idUsuario, nombre, apellido }) => (
                                    <option key={idUsuario} value={idUsuario}>{nombre} {apellido}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-800">Día de trabajo</label>
                            <select className="form-select appearance-none block w-full px-4 py-2 mt-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
                            border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                                id="dia"
                                value={diaForm}
                                onChange={e => setDiaForm(e.target.value)}
                            >
                                <option value="-1">Seleccione un día</option>
                                <option value="Lunes">Lunes</option>
                                <option value="Martes">Martes</option>
                                <option value="Miercoles">Miércoles</option>
                                <option value="Jueves">Jueves</option>
                                <option value="Viernes">Viernes</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-800">Horario de ingreso</label>
                            <input type="time" className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40-300 focus:outline-none focus:ring"
                                name="ingreso_actividad"
                                value={ingreso_actividad}
                                onChange={onInputChange}
                            />
                        </div>

                        <div>
                            <label className="text-gray-800">Horario de salida</label>
                            <input type="time" className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40-300 focus:outline-none focus:ring"
                                name="salida_actividad"
                                value={salida_actividad}
                                onChange={onInputChange}
                            />
                        </div>

                        <div>
                            <label className="text-gray-800">Inicio</label>
                            <input type="date" className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40-300 focus:outline-none focus:ring"
                                name="inicio_actividad"
                                value={inicio_actividad}
                                onChange={onInputChange}
                                min={fechaActual}
                            />
                        </div>

                        <div>
                            <label className="text-gray-800">Fin</label>
                            <input type="date" className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40-300 focus:outline-none focus:ring"
                                name="fin_actividad"
                                value={fin_actividad}
                                onChange={onInputChange}
                                min={fechaActual}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button type='submit' className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600">Registrar</button>
                    </div>

                    {error
                        && <div className="mt-4 flex p-4 bg-red-100 rounded-md border-t-4 border-red-500 dark:bg-red-200" role="alert">
                            <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <div className="ml-3 text-sm font-medium text-red-700">
                                {error}
                            </div>
                        </div>
                    }

                    {success
                        && <div className="mt-4 flex p-4 bg-green-100 rounded-md border-t-4 border-green-500 dark:bg-green-200" role="alert">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <div className="ml-3 text-sm font-medium text-green-700">
                                Se creó la actividad correctamente.
                            </div>
                        </div>
                    }
                </form>
            </section>
        </>
    )
}
