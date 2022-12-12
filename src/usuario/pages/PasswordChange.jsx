import React, { useState } from 'react'
import asistenciaApi from '../../api/asistenciaApi';
import { useAuthStore } from '../../hook/useAuthStore';
import { useForm } from '../../hook/useForm';
import { Sidebar } from '../components/Sidebar'

const horarioFormFields = {
    newPassword: ''
}

export const PasswordChange = () => {

    const { user } = useAuthStore();

    const { newPassword, onInputChange, onResetForm } = useForm(horarioFormFields);

    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword == '') {
            setError(true);
            setErrorMessage('El campo es obligatorio.');
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000)
            return;
        } else if (newPassword.length <= 5) {
            setError(true);
            setErrorMessage('La contraseña es de 6 caracteres a más');
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000)
            return;
        } else {
            const { data } = await asistenciaApi.put(`/usuario/passwordact/${user.idUsuario}`, { password: newPassword });
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000)

            onResetForm();
        }

    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full h-screen p-5 '>
                <div className='bg-white rounded-lg p-2 h-full shadow-xl'>
                    <div className='flex flex-col gap-12 justify-center items-center h-full'>
                        <h2 className='text-center text-3xl font-semibold my-8 uppercase'>Cambio de contraseña</h2>

                        <div className='relative w-5/6 md:w-3/6 lg:w-2/6 xl:w-96 border p-5 rounded-xl bg-white'>
                            <form onSubmit={handlePasswordChange} className="px-3">
                                <div className='mb-8'>
                                    <label className='block text-sm mb-10 font-semibold'>Ingrese su nueva contraseña</label>
                                    <div className='relative'>
                                        <input className="w-full text-sm py-1 border-b-2 border-gray-600 transition-colors duration-500 focus:outline-none focus:border-blue-600"
                                            type={showPassword ? "text" : "password"}
                                            name="newPassword"
                                            value={newPassword}
                                            onChange={onInputChange}
                                            autoComplete="false"
                                        />
                                        <p className='cursor-pointer font-extrabold absolute right-2 bottom-1' onClick={() => { setShowPassword(!showPassword) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                            </svg>
                                        </p>
                                    </div>

                                </div>

                                {error
                                    && <div className="flex p-4 mb-4 bg-red-100 rounded-md border-t-4 border-red-500 dark:bg-red-200" role="alert">
                                        <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                        <div className="ml-3 text-sm font-medium text-red-700">
                                            {errorMessage}
                                        </div>
                                    </div>
                                }

                                {success
                                    && <div className="mt-4 flex p-4 mb-4 bg-green-100 rounded-md border-t-4 border-green-500 dark:bg-green-200" role="alert">
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                        <div className="ml-3 text-sm font-medium text-green-700">
                                            La contraseña fue cambiada exitosamente.
                                        </div>
                                    </div>
                                }

                                <button className='w-full text-center text-white text-lg font-bold p-3 rounded-xl mb-3 duration-500 bg-blue-600 hover:bg-blue-700'
                                    type='submit'>
                                    Cambiar contraseña
                                </button>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}