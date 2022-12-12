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
                                <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png" alt="img_user"
                                    className="w-36 mx-auto"
                                />
                                <div className="flex justify-center mt-3">
                                    <span className="font-bold text-center">{user.nombre}</span>
                                </div>
                            </li>
                        </ul>
                        <ul className="pt-4 mt-4 space-y-2 border-t-2 border-white font-normal">
                            <li>
                                <Link to="/usuarios" className="flex items-center p-2 rounded-lg transition duration-500 hover:bg-blue-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-4">Usuarios</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/actividades" className="flex items-center p-2 rounded-lg transition duration-500 hover:bg-blue-800">
                                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-100 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                                    <span className="ml-3">Actividades</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/reportes" className="flex items-center p-2 rounded-lg transition duration-500 hover:bg-blue-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                    </svg>
                                    <span className="ml-4">Reportes</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/feriados" className="flex items-center p-2 rounded-lg transition duration-500 hover:bg-blue-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                    </svg>
                                    <span className="ml-4">Feriados</span>
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