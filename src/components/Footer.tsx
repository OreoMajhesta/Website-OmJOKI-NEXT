'use client';

import { useTheme } from '../app/functions/ThemeContext'
import { icons } from '../../public/assets/icons/icons'

const Footer = () => {
    const { isDarkTheme, toggleTheme } = useTheme()
    return (
        <footer className="container mx-auto py-6 mb-14 md:mb-0">
            <hr className={`border-t mb-4 border-slate-300`} />
            <div className="flex justify-between items-center p-5">
                <h1 className="font-poppins text-base">
                    &copy; 2024 Om JOKI. Made by Oreo Majhesta.
                </h1>

                <button
                    onClick={toggleTheme}
                    className={`text-xl md:text-4xl p-2 transition-colors duration-300 rounded-xl border-2 border-sky-500 ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'
                        }`}
                    aria-label="Toggle theme"
                >
                    {isDarkTheme ? (
                        <icons.MdLightMode className="text-white" />
                    ) : (
                        <icons.MdDarkMode className="text-black" />
                    )}
                </button>
            </div>
            <div className='mb-0 md:mb-14'></div>
        </footer>
    )
}

export default Footer;
