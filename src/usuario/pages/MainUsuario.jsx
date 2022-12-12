import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { TablaHorarios } from '../components/TablaHorarios';

export const MainUsuario = () => {

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full p-5 '>
                <div className='bg-white rounded-lg p-2 h-full shadow-xl'>
                    <h2 className='text-center text-3xl font-semibold my-8 uppercase'>Lista de horarios</h2>
                    <TablaHorarios />
                </div>
            </div>
        </div>
    )
}
