import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'

import { useAuthStore } from '../hook/useAuthStore'

import { ThreeCircles } from 'react-loader-spinner'

/* Páginas de Usuarios */
import { MainAdmin } from '../admin/pages/MainAdmin'
import { Registro as RegistroUsuario } from '../admin/usuarios/Registro'
import { Editar as EditarUSuario } from '../admin/usuarios/Editar'
import { ResetPassword } from '../auth/pages/ResetPassword'

/* Páginas de Feriados */
import { FeriadoAdmin } from '../admin/pages/FeriadoAdmin'
import { RegistroFeriado } from '../admin/feriados/RegistroFeriado'
import { Editar as EditarFeriado } from '../admin/feriados/Editar'

/* Páginas de Actividades */
import { ActividadAdmin } from '../admin/pages/ActividadAdmin'
import { RegistroActividad } from '../admin/actividades/RegistroActividad'
import { EditarActividad } from '../admin/actividades/EditarActividad'

/* Páginas de Actividades - Empleado */
import { MainUsuario } from '../usuario/pages/MainUsuario'

/* Páginas de Horarios - General */
import { HorariosPage } from '../horarios/pages/HorariosPage'
import { IngresoForm } from '../horarios/components/IngresoForm'
import { SalidaForm } from '../horarios/components/SalidaForm'

/* Páginas de Reportes */
import { ReporteAdmin } from '../admin/pages/ReporteAdmin'
import { PasswordChange } from '../usuario/pages/PasswordChange'

export const AppRouter = () => {

    const { user, status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])

    if (status === 'checking') {
        return (
            <div className='w-full h-screen flex justify-center items-center'>
                <ThreeCircles
                    height="100"
                    width="100"
                    color="#2563eb"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                />
            </div>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated' || user.actividad_usuario === '1')
                    ? (
                        <>
                            <Route path='/horarios/*' element={<HorariosPage />} />
                            <Route path='/horario/ingreso/:id' element={<IngresoForm />} />
                            <Route path='/horario/salida/:id' element={<SalidaForm />} />
                            <Route path='/horarios/*' element={<Navigate to="/horarios" />} />

                            <Route path='/resetpassword' element={<ResetPassword />} />

                            <Route path='/auth/*' element={<LoginPage />} />
                            <Route path='/*' element={<Navigate to="/auth/login" />} />

                        </>
                    )
                    : (user.idArea === 1) ? (
                        <>
                            <Route path='/usuarios' element={<MainAdmin />} />
                            <Route path='/usuarios/registro' element={<RegistroUsuario />} />
                            <Route path='/usuarios/editar/:id' element={<EditarUSuario />} />
                            <Route path='/*' element={<Navigate to="/usuarios" />} />

                            <Route path='/feriados' element={<FeriadoAdmin />} />
                            <Route path='/feriados/registro' element={<RegistroFeriado />} />
                            <Route path='/feriados/editar/:id' element={<EditarFeriado />} />
                            <Route path='/*' element={<Navigate to="/feriados" />} />

                            <Route path='/actividades' element={<ActividadAdmin />} />
                            <Route path='/actividades/registro' element={<RegistroActividad />} />
                            <Route path='/actividades/editar/:id' element={<EditarActividad />} />
                            <Route path='/*' element={<Navigate to="/actividades" />} />

                            <Route path='/reportes' element={<ReporteAdmin />} />
                        </>
                    ) : (
                        <>
                            <Route path='/actividades' element={<MainUsuario />} />
                            <Route path='/password' element={<PasswordChange />} />
                            <Route path='/*' element={<Navigate to="/actividades" />} />
                        </>
                    )

            }
        </Routes>
    )
}
