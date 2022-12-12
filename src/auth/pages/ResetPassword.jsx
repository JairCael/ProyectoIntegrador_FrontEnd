import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import asistenciaApi from '../../api/asistenciaApi'
import { useForm } from '../../hook/useForm'

const loginFormFields = {
    resetDni: '',
    resetEmail: '',
}

export const ResetPassword = () => {

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [btnDisabled, setBtnDisabled] = useState(false);

    const { resetDni, resetEmail, onInputChange: onResetPasswordInputChange } = useForm(loginFormFields);

    const resetPasswordSubmit = async (e) => {
        e.preventDefault();
        try {

            if (resetDni == "" || resetEmail == "") {
                setBtnDisabled(true);
                setError(true);
                setErrorMessage("Todos los campos son obligatorios");
                setTimeout(() => {
                    setError(false);
                    setErrorMessage(null);
                    setBtnDisabled(false);
                }, 2500)
                return;
            } else {
                setBtnDisabled(true);
                const { data } = await asistenciaApi.post('/usuario/resetpassword', { dni: resetDni, email: resetEmail });
                Swal.fire(data.msg);
                navigate(`/auth/login`);
                setBtnDisabled(false);
            }

        } catch (error) {
            setBtnDisabled(true);
            setError(true);
            setErrorMessage(error.response.data.msg);
            setTimeout(() => {
                setError(false);
                setErrorMessage(null);
                setBtnDisabled(false);
            }, 2500)
        }

    }

    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">

                <div className='my-8 ml-52'>
                    <Link to="/auth/login" className='px-3 py-2 rounded-xl text-white bg-green-600'>Regresar a login</Link>
                </div>
                <div className='relative w-5/6 md:w-3/6 lg:w-2/6 xl:w-96 border p-5 rounded-xl bg-white'>

                    <div className='text-center mt-5 mb-10 flex justify-center'>
                        <h2 className='text-2xl uppercase font-extrabold'>Recuperar Contraseña</h2>
                    </div>
                    <form onSubmit={resetPasswordSubmit} className="px-3">
                        <div className='mb-8'>
                            <label className='block text-sm mb-2 font-semibold'>DNI</label>
                            <input className="w-full text-sm py-1 border-b-2 border-gray-600 transition-colors duration-500 focus:outline-none focus:border-blue-600"
                                type="text"
                                name="resetDni"
                                value={resetDni}
                                onChange={onResetPasswordInputChange}
                                autoComplete="false"
                                maxLength={8}
                            />
                        </div>
                        <div className='mb-8'>
                            <label className='block text-sm mb-2 font-semibold'>Correo electrónico</label>
                            <input className="w-full text-sm py-1 border-b-2 border-gray-600 transition-colors duration-500 focus:outline-none focus:border-blue-600"
                                type="email"
                                name="resetEmail"
                                value={resetEmail}
                                onChange={onResetPasswordInputChange}
                                autoComplete="false"
                            />
                        </div>

                        {error
                            && <div className="flex p-4 mb-4 bg-red-100 rounded-md border-t-4 border-red-500 dark:bg-red-200" role="alert">
                                <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                <div className="ml-3 text-sm font-medium text-red-700">
                                    {errorMessage}
                                </div>
                            </div>
                        }

                        <button disabled={btnDisabled} className=' w-full text-center text-white text-lg font-bold p-3 rounded-xl mb-3 duration-500 bg-blue-600 hover:bg-blue-700'
                            type='submit'>
                            Enviar
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}