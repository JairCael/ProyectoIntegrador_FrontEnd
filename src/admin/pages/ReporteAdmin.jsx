import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import asistenciaApi from '../../api/asistenciaApi';
import { Sidebar } from '../components/Sidebar'

import saveAs from 'file-saver'
import { TablaReporte } from '../components/TablaReporte';

export const ReporteAdmin = () => {

    const [horarios, setHorarios] = useState([]);
    const [actividades, setActividades] = useState([]);

    const listarHorarios = async () => {
        const { data } = await asistenciaApi.get('horario/');
        setHorarios(data.horario_asistencia_All);
    }

    const listarActividades = async () => {
        const { data } = await asistenciaApi.get('actividad/');
        setActividades(data.actividades_All);
    }

    useEffect(() => {
        listarHorarios();
        listarActividades();
    }, [])


    let listadoHorarios = [];

    actividades.map(actividad => {
        horarios.map(horario => {
            if (actividad.idActividad === horario.actividad.idActividad && horario.estado != undefined) {
                listadoHorarios.push({
                    idHorarioAsistencia: horario.idHorarioAsistencia,
                    dni: actividad.usuario.dni,
                    nombre: actividad.usuario.nombre,
                    apellido: actividad.usuario.apellido,
                    fecha: horario.fechaAsistencia,
                    ingreso: actividad.ingreso_actividad,
                    salida: actividad.salida_actividad,
                    hora_ingreso: horario.hora_ingreso,
                    hora_salida: horario.hora_salida,
                    estado: horario?.estado?.idEstado
                })
            }
        })
    })

    const createAndDownloadPdf = () => {
        asistenciaApi.post('reporte/create-pdf', listadoHorarios)
            .then(() => asistenciaApi.get('reporte/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'reporte.pdf');
            })
    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full p-5 h-screen'>
                <div className='bg-white h-full rounded-xl p-2 shadow-xl'>
                    <h2 className='text-center text-3xl font-semibold my-8 uppercase'>Reporte de asistencias</h2>
                    <div className='w-full flex justify-center px-8'>
                        <button onClick={createAndDownloadPdf} className='px-3 py-2 rounded-xl text-white bg-green-600'>Generar reporte</button>
                    </div>
                    <TablaReporte listadoHorarios={listadoHorarios} />
                </div>
            </div>
        </div>
    )
}