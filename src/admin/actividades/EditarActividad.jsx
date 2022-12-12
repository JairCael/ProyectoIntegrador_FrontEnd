import React from 'react'
import { Sidebar } from '../components/Sidebar'

export const EditarActividad = () => {
    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='w-full p-5 h-full md:h-screen bg-gray-100'>
                    <div className='bg-white rounded-xl p-2 h-full shadow-xl'>
                        <h2 className='text-center text-3xl font-semibold my-12 uppercase'>Editar actividad</h2>
                    </div>
                </div>
            </div>
        </>
    )
}