"use client";

import React from 'react';
import { useState } from 'react';
import gamesdata from "../../public/assets/data/GamesData";
import { useTheme } from '../app/functions/ThemeContext';
import Image from 'next/image';

interface Item {
    item: string;
    price: string;
}

const PriceList = () => {
    const { isDarkTheme } = useTheme();
    const [selectedGame, setSelectedGame] = useState(gamesdata[0]);

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-center gap-5 md:gap-20 mb-6 md:mb-8">
                {gamesdata.map((game) => (
                    <button
                        key={game.id}
                        onClick={() => setSelectedGame(game)}
                        className={`p-4 md:p-6 rounded-lg shadow-lg border-2 ${selectedGame.id === game.id ? 'bg-gradient-to-r from-blue-400 to-sky-500 text-white border-transparent' : 'bg-white text-sky-600 border-sky-400'
                            } transition-all duration-500 hover:scale-105 hover:shadow-xl`}
                        style={{ minWidth: '100px', maxWidth: '160px' }}
                    >
                        <Image
                            src={game.logo}
                            alt={game.logo}
                            className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-2 rounded-xl"
                            width={300}
                            height={300}
                        />
                        <span className="text-sm md:text-lg font-semibold">{game.name}</span>
                    </button>
                ))}
            </div>


            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-sky-500 text-white">
                            <th className="p-3 md:p-4 border border-gray-300">{selectedGame.name}</th>
                            <th className="p-3 md:p-4 border border-gray-300">Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(selectedGame.categories).map(([category, items], idx) => (
                            <React.Fragment key={idx}>
                                <tr className={`transition-all duration-300 ${isDarkTheme ? 'bg-slate-800 text-white' : 'bg-gray-200 border-gray-300'}`}>
                                    <td colSpan={2} className="p-3 md:p-4 font-semibold text-center">{category}</td>
                                </tr>
                                {(items as Item[]).map((item, index) => (
                                    <tr key={index} className="border-t border-gray-300">
                                        <td className="p-3 md:p-4 border w-3/4 border-gray-300">{item.item}</td>
                                        <td className="p-3 md:p-4 border border-gray-300">{item.price}</td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default PriceList;
