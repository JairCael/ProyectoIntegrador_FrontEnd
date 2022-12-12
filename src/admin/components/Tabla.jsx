import React from 'react'
import { useNavigate } from 'react-router-dom'
import asistenciaApi from '../../api/asistenciaApi';
import Swal from 'sweetalert2'

export const Tabla = ({ usuarios }) => {

    const navigate = useNavigate();

    const eliminarUsuario = async (idUsuario) => {
        const { data } = await asistenciaApi.put(`/usuario/eliminar/${idUsuario}`);
        Swal.fire('La cuenta del usuario está inactiva');
        navigate(`/usuarios}`)
    }

    const restaurarUsuario = async (idUsuario) => {
        const { data } = await asistenciaApi.put(`/usuario/restaurar/${idUsuario}`);
        Swal.fire('La cuenta del usuario se activó nuevamente');
        navigate(`/usuarios}`)
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
                                        DNI
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Nombre completo
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Email
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Feriados
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Área
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Tarifa por hora
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Actividad
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(({ idUsuario, nombre, apellido, email, dni, tipo, area, tarifa_hora, actividad_usuario }) => (
                                    <tr key={idUsuario} className="bg-white border-b cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{dni}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {nombre} {apellido}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {email}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {tipo == 0 ? 'Sí trabaja' : 'No trabaja'}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {area.descripcion}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {`S/.${tarifa_hora}`}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {actividad_usuario === "0" ? 'Activo' : 'Inactivo'}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap flex gap-3">
                                            <button onClick={() => navigate(`/usuarios/editar/${idUsuario}`)} className='p-2 bg-yellow-500 text-white font-semibold rounded-md'>Editar</button>
                                            {actividad_usuario == 0
                                                ?
                                                <button onClick={() => { eliminarUsuario(idUsuario) }} className='p-2 bg-red-500 text-white font-semibold rounded-md'>Eliminar</button>
                                                : <button onClick={() => { restaurarUsuario(idUsuario) }} className='p-2 bg-blue-500 text-white font-semibold rounded-md'>Restaurar</button>
                                            }
                                        </td>
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
