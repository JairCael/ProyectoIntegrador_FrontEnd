import React from 'react'

export const TablaReporte = ({ listadoHorarios }) => {

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
                                        Nombre
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                        Apellido
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Fecha
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Ingreso
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Salida
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        H. Ingreso
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listadoHorarios.map(({ idHorarioAsistencia, dni, nombre, apellido, fecha, ingreso, salida, hora_ingreso, estado }) => (
                                    <tr key={idHorarioAsistencia} className="bg-white border-b cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{dni}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {nombre}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {apellido}
                                        </td>
                                        <td className="text-sm text-left text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {fecha}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {ingreso}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {salida}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {hora_ingreso}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {estado == 1 ? 'Normal' : estado == 2 ? 'Tardanza' : 'Falta'}
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
