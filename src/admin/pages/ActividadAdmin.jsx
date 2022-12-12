import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import asistenciaApi from '../../api/asistenciaApi';
import { Sidebar } from '../components/Sidebar'
import { TablaActividad } from '../components/TablaActividad';

export const ActividadAdmin = () => {

    const [actividades, setActividades] = useState([]);

    const listarActividades = async () => {
        const { data } = await asistenciaApi.get('actividad/');
        setActividades(data.actividades_All);
    }

    useEffect(() => {
        listarActividades();
    }, [])

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full p-5 '>
                <div className='bg-white rounded-xl p-2 shadow-xl'>
                    <h2 className='text-center text-3xl font-semibold my-8 uppercase'>Lista de actividades</h2>
                    <div className='w-full flex justify-between px-8'>
                        <input className='px-3 py-1.5 border border-solid border-gray-300 rounded transition ease-in-out focus:outline-none' type="search" placeholder="Buscar actividad" />
                        <Link to="/actividades/registro" className='px-3 py-2 rounded-xl text-white bg-green-600'>Agregar actividad</Link>
                    </div>
                    <TablaActividad actividades={actividades} />
                </div>
            </div>
        </div>
    )
}