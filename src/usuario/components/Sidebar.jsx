import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hook/useAuthStore';


export const Sidebar = () => {

    const { startLogout, user } = useAuthStore();

    const [navBar, setNavBar] = useState(true);
    const [buttonPos, setButtonPos] = useState(true);

    const toggleButton = () => {
        setNavBar(!navBar);
        setButtonPos(!buttonPos);
    }

    return (
        <div className='mr-0 lg:mr-64'>
            <div className="fixed">
                <aside className={`w-64 ${navBar ? '' : '-ml-64'} duration-700 text-white `} aria-label="Sidebar">
                    <div className="h-screen w-64 absolute bg-blue-700"></div>
                    <div className="h-screen overflow-y-auto py-4 px-3 relative">
                        <h1 className="text-center text-3xl mb-6 font-bold uppercase ">Asistenciapp</h1>
                        <ul className="space-y-2">
                            <li>
                                <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png"
                                    className="w-36 mx-auto"
                                />
                                <div className="flex justify-center mt-3">
                                    <span className="font-bold text-center">{user.nombre}</span>
                                </div>
                            </li>
                        </ul>
                        <ul className="pt-4 mt-4 space-y-2 border-t-2 border-white font-normal">
                            <li>
                                <Link to="/actividades" className="flex items-center p-2 rounded-lg transition duration-500 hover:bg-blue-800">
                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-100 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                                    <span className="ml-4">Actividades</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/password" className="flex items-center p-2 rounded-lg transition duration-500 hover:bg-blue-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-3">Contraseña</span>
                                </Link>
                            </li>
                            <li>
                                <button onClick={startLogout} href="#" className="w-full flex items-center p-2 rounded-lg transition duration-500 hover:bg-blue-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-3">Cerrar sesión</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>
                <button onClick={toggleButton} className={`lg:hidden px-2 py-1 bg-red-500 rounded-sm absolute top-0 ${buttonPos ? 'ml-64' : 'ml-0'} duration-700`}>HH</button>
            </div>
        </div>
    )
}