import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import asistenciaApi from '../../api/asistenciaApi';
import { Sidebar } from '../components/Sidebar'
import { TablaFeriado } from '../components/TablaFeriado';

export const FeriadoAdmin = () => {

    const [feriados, setFeriados] = useState([]);

    const listarFeriados = async () => {
        const { data } = await asistenciaApi.get('feriado/');
        setFeriados(data.feriados_All);
    }

    useEffect(() => {
        listarFeriados();
    }, [])

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full p-5 '>
                <div className='bg-white rounded-xl p-2 shadow-xl'>
                    <h2 className='text-center text-3xl font-semibold my-8 uppercase'>Lista de feriados</h2>
                    <div className='w-full flex justify-between px-8'>
                        <input className='px-3 py-1.5 border border-solid border-gray-300 rounded transition ease-in-out focus:outline-none' type="search" placeholder="Buscar feriado" />
                        <Link to="/feriados/registro" className='px-3 py-2 rounded-xl text-white bg-green-600'>Agregar Feriado</Link>
                    </div>
                    <TablaFeriado feriados={feriados} />
                </div>
            </div>
        </div>
    )
}
