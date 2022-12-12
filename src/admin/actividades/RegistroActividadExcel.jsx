import React, { useState } from 'react'
import uuid from 'react-uuid';
import * as XLSX from 'xlsx';
import { useActividadStore } from '../../hook/useActividadStore';
import { useAuthStore } from '../../hook/useAuthStore';


export const RegistroActividadExcel = () => {

    const { user } = useAuthStore();
    const { startSavingActividad } = useActividadStore();

    const [success, setSuccess] = useState(false);

    //onChange inputs
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const [columns, setColumns] = useState([]);

    //Submit
    const [excelData, setExcelData] = useState(null);

    const [dataConvert, setDataConvert] = useState(null);

    const columnsTemplate = ['ID_USUARIO', 'DÍA', 'INGRESO', 'SALIDA', 'INICIO', 'FIN'];

    const handleFile = async (e) => {

        const file = e.target.files[0];
        const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];

        if (file) {
            if (file && fileType.includes(file.type)) {

                setExcelFileError(null);

                const data = await file.arrayBuffer();
                const workbook = XLSX.read(data);

                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    defval: ""
                });

                setColumns(jsonData[0]);
                setExcelData(jsonData);
            } else {
                setExcelFileError('Por favor, seleccione un archivo excel.')
                setExcelFile(null);
            }
        } else {
            setExcelFileError('Por favor, seleccione un archivo');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = columns.length == columnsTemplate.length && columns.every((column, i) => {
            return column === columnsTemplate[i]
        });

        if (!result) {
            return setExcelFileError('El formato de columnas es incorrecto.');
        }
        setExcelFileError(null);

        for (let i = 1; i <= excelData.length - 1; i++) {

            const id_actividad = uuid();

            const idUsuario = excelData[i]?.[0];
            const dia = excelData[i]?.[1];
            const ingreso_actividad = excelData[i]?.[2];
            const salida_actividad = excelData[i]?.[3]
            const inicio = (excelData[i]?.[4]).replaceAll('/', '-');
            const fin = (excelData[i]?.[5]).replaceAll('/', '-');

            const inicio_actividad = inicio.split('-').reverse().join().replaceAll(',', '-');
            const fin_actividad = fin.split('-').reverse().join().replaceAll(',', '-');

            startSavingActividad({
                idActividad: id_actividad, idUsuario: idUsuario, dia: dia, ingreso_actividad: ingreso_actividad,
                salida_actividad: salida_actividad, inicio_actividad: inicio_actividad,
                fin_actividad: fin_actividad, createdByUser: user.idUsuario
            })
        }

        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 3000)
    }

    return (
        <div className='mt-4 mb-12'>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFile}></input>
                <button type='submit' className='px-5 py-2 bg-blue-600 ml-11 text-white rounded-md'>Cargar</button>
            </form>

            {success
                && <div className="mt-4 flex p-4 bg-green-100 rounded-md border-t-4 border-green-500 dark:bg-green-200" role="alert">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                    <div className="ml-3 text-sm font-medium text-green-700">
                        Se agregaron las actvidades correctamente.
                    </div>
                </div>
            }

            {
                excelFileError && (
                    <p className='text-red-500'>{excelFileError}</p>
                )
            }

        </div>
    )
}
