import React from 'react'
import { useNavigate } from 'react-router-dom'
import asistenciaApi from '../../api/asistenciaApi';
import Swal from 'sweetalert2'

export const TablaFeriado = ({ feriados }) => {

    const navigate = useNavigate();

    const eliminarFeriado = async (idFeriado) => {
        const { data } = await asistenciaApi.delete(`/feriado/eliminar/${idFeriado}`);
        Swal.fire('Feriado eliminado');
        navigate(`/feriados`)
    }

    return (
        <div className="flex flex-col mt-3">
            <div className="overflow-x-auto">
                <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-lg">
                        <table className="min-w-full text-left rounded-lg">
                            <thead className="border-b bg-blue-600">
                                <tr>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Año
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Fecha
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Descripción
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {feriados.map(({ idFeriado, anio, fecha, descripcion }) => (
                                    <tr key={idFeriado} className="bg-white border-b cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{anio}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {fecha}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {descripcion}
                                        </td>
                                        {<td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-3">
                                            <button onClick={() => navigate(`/feriados/editar/${idFeriado}`)} className='p-2 bg-yellow-500 text-white font-semibold rounded-md'>Editar</button>

                                            <button onClick={() => { eliminarFeriado(idFeriado) }} className='p-2 bg-red-500 text-white font-semibold rounded-md'>Eliminar</button>

                                        </td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
