import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { RegistroFormulario } from './RegistroFormulario'

export const Registro = () => {
    return (
        <>
            <div className='flex'>
                <Sidebar />
                <div className='w-full p-5 h-full md:h-screen bg-gray-100'>
                    <div className='bg-white rounded-xl p-2 h-full shadow-xl'>
                        <h2 className='text-center text-3xl font-semibold my-12 uppercase'>Registro de usuario</h2>
                        <RegistroFormulario />
                    </div>
                </div>
            </div>
        </>
    )
}
