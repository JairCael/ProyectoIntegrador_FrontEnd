import { isAfter } from 'date-fns';
import React, { useEffect } from 'react'
import { useState } from 'react';
import asistenciaApi from '../../api/asistenciaApi';
import { useAuthStore } from '../../hook/useAuthStore';
import { useForm } from '../../hook/useForm';

const filterForm = {
    startDate: '',
    endDate: ''
}

export const TablaHorarios = () => {

    const [horarios, setHorarios] = useState([]);

    const [inicioDate, setInicioDate] = useState('1970-01-01');
    const [finDate, setFinDate] = useState('2030-01-01');

    const listarHorarios = async () => {
        const { data } = await asistenciaApi.post(`/horario`, { startDate: inicioDate, endDate: finDate });
        setHorarios(data.horario_asistencia_All);
    }

    useEffect(() => {
        listarHorarios();
    }, [])

    const { user } = useAuthStore();

    const [usuarioFind, setUsuarioFind] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            const { data } = await asistenciaApi.get(`/usuario/${user.idUsuario}`);
            setUsuarioFind(data.usuario);
        })();
    }, [])


    const horarioUsuario = [];


    horarios.map(horario => {
        if (horario.actividad.idUsuario == user.idUsuario) {
            horarioUsuario.push(horario);
        }
    })

    const { startDate, endDate, onInputChange } = useForm(filterForm);

    const submitFilter = async (e) => {
        e.preventDefault();

        const compararFechas = isAfter(new Date(startDate), new Date(endDate));

        if (compararFechas) {
            setError('La fecha fin tiene que ser superior a la del inicio.');
            setTimeout(() => {
                setError(null);
            }, 3000)
            return;
        }
        setInicioDate(startDate);
        setFinDate(endDate);
        listarHorarios();
    }

    return (
        <div className="flex flex-col mt-3">
            <div className="overflow-x-auto">
                <form onSubmit={submitFilter}>
                    <div className='grid grid-cols-10 px-8'>
                        <div className='col-span-4 mr-4'>
                            <label className="text-gray-800">Desde</label>
                            <input type="date" className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40-300 focus:outline-none focus:ring"
                                name="startDate"
                                value={startDate}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className='col-span-4 mr-4'>
                            <label className="text-gray-800">Hasta</label>
                            <input type="date" className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40-300 focus:outline-none focus:ring"
                                name="endDate"
                                value={endDate}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="col-span-2 flex justify-end mt-6">
                            <button type='submit' className="px-8 text-white transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-600">Filtrar</button>
                        </div>
                    </div>
                </form>



                <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg">
                        <table className="min-w-full text-left rounded-lg">
                            <thead className="border-b bg-blue-600">
                                <tr>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        DNI
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Nombre completo
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Día
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Fecha
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Hora inicio
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Hora fin
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Ingreso
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Salida
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {horarioUsuario.map(({ idHorarioAsistencia, actividad, fechaAsistencia, hora_ingreso, hora_salida, estado }) => (
                                    <tr key={idHorarioAsistencia} className="bg-white border-b cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{usuarioFind?.dni}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {usuarioFind?.nombre} {usuarioFind?.apellido}
                                        </td>
                                        <td className="text-sm text-left text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {actividad.dia}
                                        </td>
                                        <td className="text-sm text-left text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {fechaAsistencia}
                                        </td>
                                        <td className="text-sm text-left text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {actividad.ingreso_actividad}
                                        </td>
                                        <td className="text-sm text-left text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {actividad.salida_actividad}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                            {hora_ingreso == null ? '--:--' : hora_ingreso}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                            {hora_salida == null ? '--:--' : hora_salida}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {estado?.idEstado == null ? <p className='font-bold bg-gray-800 text-gray-50 p-1 rounded-xl'>Por definirse</p>
                                                : estado?.idEstado == 1 ? <p className='font-bold bg-green-500 text-gray-50 p-1 rounded-xl'>{estado.descripcion}</p>
                                                    : estado?.idEstado == 2 ? <p className='font-bold bg-yellow-500 text-gray-50 p-1 rounded-xl'>{estado.descripcion}</p>
                                                        : <p className='font-bold bg-red-500 text-gray-50 p-1 rounded-xl'>{estado.descripcion}</p>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {error
                    && <div className="mt-4 flex p-4 bg-red-100 rounded-md border-t-4 border-red-500 dark:bg-red-200" role="alert">
                        <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <div className="ml-3 text-sm font-medium text-red-700">
                            {error}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}