import React, { useState, useEffect } from 'react'
import asistenciaApi from '../../api/asistenciaApi';
import { Sidebar } from '../components/Sidebar'
import { RegistroActividadForm } from './RegistroActividadForm'

export const RegistroActividad = () => {

    const [usuarios, setUsuarios] = useState([]);

    const listarUsuarios = async () => {
        const { data } = await asistenciaApi.get('usuario/');
        setUsuarios(data.usuarios_All);
    }

    useEffect(() => {
        listarUsuarios();
    }, [])

    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='w-full p-5 h-full md:h-screen bg-gray-100'>
                    <div className='bg-white rounded-xl p-2 h-full shadow-xl'>
                        <h2 className='text-center text-3xl font-semibold my-12 uppercase'>Registro de actividades</h2>
                        <RegistroActividadForm usuarios={usuarios} />
                    </div>
                </div>
            </div>
        </>
    )
}