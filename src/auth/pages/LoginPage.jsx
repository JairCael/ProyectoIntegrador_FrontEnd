import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../hook/useAuthStore'
import { useForm } from '../../hook/useForm'

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const LoginPage = () => {

    const { errorMessage, startLogin } = useAuthStore();
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);

    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            setError(true);
        }

        setTimeout(() => {
            setError(false);
        }, 3000)

    }, [errorMessage])


    return (

        <>

            <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">

                <div className='my-8 ml-52'>
                    <Link to="/horarios" className='px-3 py-2 rounded-xl text-white bg-green-600'>Listado de horarios</Link>
                </div>
                <div className='relative w-5/6 md:w-3/6 lg:w-2/6 xl:w-96 border p-5 rounded-xl bg-white'>

                    <div className='text-center mt-5 mb-10 flex justify-center'>
                        <h2 className='text-3xl uppercase font-extrabold'>Asistencia Login</h2>
                    </div>
                    <form onSubmit={loginSubmit} className="px-3">
                        <div className='mb-8'>
                            <label className='block text-sm mb-2 font-semibold'>Email</label>
                            <input className="w-full text-sm py-1 border-b-2 border-gray-600 transition-colors duration-500 focus:outline-none focus:border-blue-600"
                                type="email"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                                autoComplete="false"
                            />
                        </div>
                        <div className='mb-8'>
                            <label className='block text-sm mb-2 font-semibold'>Password</label>
                            <div className='relative'>
                                <input className="w-full text-sm py-1 border-b-2 border-gray-600 transition-colors duration-500 focus:outline-none focus:border-blue-600"
                                    type={showPassword ? "text" : "password"}
                                    name="loginPassword"
                                    value={loginPassword}
                                    onChange={onLoginInputChange}
                                    autoComplete="false"
                                />
                                <p className='cursor-pointer font-extrabold absolute right-2 bottom-1' onClick={() => { setShowPassword(!showPassword) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                    </svg>
                                </p>
                            </div>
                            <div className='text-right pt-2'>
                                <Link to="/resetpassword" className='text-sm cursor-pointer underline text-blue-500'>¿Olvidaste tu contraseña?</Link>
                            </div>
                        </div>

                        {error
                            && <div className="flex p-4 mb-4 bg-red-100 rounded-md border-t-4 border-red-500 dark:bg-red-200" role="alert">
                                <svg className="flex-shrink-0 w-5 h-5 text-red-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                <div className="ml-3 text-sm font-medium text-red-700">
                                    Las credenciales ingresadas son incorrectas
                                </div>
                            </div>
                        }

                        <button className='w-full text-center text-white text-lg font-bold p-3 rounded-xl mb-3 duration-500 bg-blue-600 hover:bg-blue-700'
                            type='submit'>
                            Iniciar sesión
                        </button>

                    </form>
                </div>
            </div>

        </>
    )
}
