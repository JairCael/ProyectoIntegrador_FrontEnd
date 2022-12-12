import React, { useEffect } from 'react'
import { useState } from 'react'
import asistenciaApi from '../../api/asistenciaApi'
import { useFeriado } from '../../hook/useFeriado'
import { useForm } from '../../hook/useForm'

const registerForm = {
    anio: '',
    fecha: '',
    descripcion: ''
}

export const RegistroFormulario = () => {

    const { startSavingFeriado } = useFeriado();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [feriados, setFeriados] = useState([]);


    const { anio, fecha, descripcion, onInputChange, onResetForm } = useForm(registerForm)

    const listarFeriados = async () => {
        const { data } = await asistenciaApi.get('feriado/');
        setFeriados(data.feriados_All);
    }

    const fechas = [];

    feriados.map(feriado => {
        fechas.push(feriado.fecha.toString());
    });

    useEffect(() => {
        listarFeriados();
    }, [])

    const registroSubmit = async (e) => {

        e.preventDefault();

        if (!anio || !fecha || !descripcion) {
            setError(true);
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setError(false);
                setMensaje('');
            }, 3000)
            return;
        } else if (fechas.includes(fecha)) {
            setError(true);
            setMensaje('La fecha ya existe');
            setTimeout(() => {
                setError(false);
                setMensaje('');
            }, 3000)
            return;
        } else {
            startSavingFeriado({
                anio: anio,
                fecha: fecha,
                descripcion: descripcion
            });

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000)

            onResetForm();
        }
    }


    return (
        <>
            <section className="w-5/6 p-6 mx-auto bg-white rounded-md">
                <form onSubmit={registroSubmit}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-800">Año</label>
                            <input type="number" maxLength={4} className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40-300 focus:outline-none focus:ring"
                                name="anio"
                                value={anio}
                                onChange={onInputChange}
                                autoComplete="false"

                            />
                        </div>

                        <div>
                            <label className="text-gray-800">Fecha</label>
                            <input type="date" className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40-300 focus:outline-none focus:ring"
                                name="fecha"
                                value={fecha}
                                onChange={onInputChange}
                                autoComplete="false"

                            />
                        </div>

                        <div>
                            <label className="text-gray-800">Descripcion</label>
                            <textarea type="text" className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40-300 focus:outline-none focus:ring"
                                name="descripcion"
                                value={descripcion}
                                onChange={onInputChange}

                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type='submit' className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600">Guardar</button>
                    </div>

                    {error
                        && <div className="mt-4 flex p-4 bg-red-100 rounded-md border-t-4 border-red-500 dark:bg-red-200" role="alert">
                            <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <div className="ml-3 text-sm font-medium text-red-700">
                                {mensaje}
                            </div>
                        </div>
                    }

                    {success
                        && <div className="mt-4 flex p-4 bg-green-100 rounded-md border-t-4 border-green-500 dark:bg-green-200" role="alert">
                            <svg className="flex-shrink-0 w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <div className="ml-3 text-sm font-medium text-green-700">
                                El feriado fue creado exitosamente.
                            </div>
                        </div>
                    }
                </form>
            </section>
        </>
    )
}
