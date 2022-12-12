import React from 'react'

export const TablaActividad = ({ actividades }) => {

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
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Día
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Ingreso
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Salida
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Inicio
                                    </th>
                                    <th scope="col" className="text-sm text-center font-medium text-white px-6 py-4">
                                        Fin
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {actividades.map(({ idActividad, usuario, dia, ingreso_actividad, salida_actividad, inicio_actividad, fin_actividad, estado }) => (
                                    <tr key={idActividad} className="bg-white border-b cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">{usuario.dni}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {usuario.nombre} {usuario.apellido}
                                        </td>
                                        <td className="text-sm text-left text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {dia}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {ingreso_actividad}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {salida_actividad}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {inicio_actividad}
                                        </td>
                                        <td className="text-sm text-center text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {fin_actividad}
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
