"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../app/functions/ThemeContext';
import { icons } from '../../public/assets/icons/icons';
import Image from 'next/image';

const Navbar = () => {
    const { isDarkTheme } = useTheme();
    const [navbarState, setNavbarState] = useState(0);
    const prevScrollY = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            if (currentScrollY === 0) {
                setNavbarState(0);
            } else if (currentScrollY > 0 && currentScrollY <= 100) {
                setNavbarState(1);
            } else if (currentScrollY > prevScrollY.current) {
                setNavbarState(2);
                timeoutRef.current = setTimeout(() => {
                    setNavbarState(3);
                }, 500);
            } else if (currentScrollY < prevScrollY.current) {
                setNavbarState(3);
            }

            prevScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <nav>
            <div
                className={`transition-all duration-500 bg-opacity-70 backdrop-blur-sm
                            ${navbarState === 0 ? 'w-full py-6 translate-y-0 rounded-none border-none' : ''}
                            ${navbarState === 1 ? 'w-11/12 translate-y-5' : ''}
                            ${navbarState === 2 ? '-translate-y-full w-0' : ''}
                            ${navbarState === 3 ? 'translate-y-5 w-11/12' : ''}
                            ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'}
                            border-solid border-2 border-sky-500 py-4 px-5 fixed top-0 z-50 font-sans rounded-full transform left-1/2 -translate-x-1/2
                        `}
            >
                <div className="px-2 md:px-10 lg:px-16 mx-auto flex items-center justify-between">
                    <div className="flex items-center font-bold text-2xl space-x-3">
                        <Image
                            src="/logo.webp"
                            alt="Logo"
                            className="h-8 lg:h-10 xl:h-12 w-auto cursor-pointer"
                            width={500}
                            height={500}
                        />
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-Rajdhani font-extrabold">Om JOKI</h1>
                    </div>

                    <div className="flex items-center gap-x-5 lg:gap-x-10">
                        <ul className="hidden lg:flex items-center gap-x-5 lg:gap-x-10 font-normal">
                            <li>
                                <Link href="/">
                                    <span className="text-md underline-offset-4 hover:underline lg:text-xl xl:text-2xl font-Poppins">
                                        Home
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricelist">
                                    <span className="text-md underline-offset-4 hover:underline lg:text-xl xl:text-2xl font-Poppins font-b">
                                        Price List
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    <span className="text-md underline-offset-4 hover:underline lg:text-xl xl:text-2xl font-Poppins">
                                        Consultation
                                    </span>
                                </Link>
                            </li>
                        </ul>

                        <Link href="/">
                            <span className="bg-transparent border-sky-500 border-2 px-5 py-2 xl:px-10 xl:text-2xl hover:bg-sky-500 rounded-full font-medium font-Poppins">
                                Login
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`fixed z-50 bottom-0 w-full lg:hidden transition-all duration-500 ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-black'} border-t border-sky-500 dark:border-gray-700 pb-2`}>
                <ul className="flex justify-around items-center font-normal">
                    <li>
                        <Link href="/">
                            <span className="flex flex-col text-sm hover:bg-sky-500 font-Poppins items-center justify-center p-3 px-5 rounded-b-full">
                                <icons.AiOutlineHome className='text-4xl hover:scale-110' />
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/pricelist">
                            <span className="flex flex-col text-sm hover:bg-sky-500 font-Poppins items-center justify-center p-3 px-5 rounded-b-full">
                                <icons.AiOutlineTag className='text-4xl hover:scale-110' />
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <span className="flex flex-col text-sm hover:bg-sky-500 font-Poppins items-center justify-center p-3 px-5 rounded-b-full">
                                <icons.BsChat className='text-4xl hover:scale-110' />
                            </span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
