"use client";

import { useTheme } from '../app/functions/ThemeContext';
import { icons } from '../../public/assets/icons/icons';
import AnimationInBottom from '../app/animation/AnimationInBottom';

const WhyItems = [
    {
        icon: icons.AiOutlineFieldTime,
        name: 'Cepat & Efisien',
        description: 'Kami menyelesaikan pesanan dengan cepat, sehingga Anda dapat menikmati hasilnya tanpa menunggu lama.'
    },
    {
        icon: icons.MdOutlineMonetizationOn,
        name: 'Garansi',
        description: 'Jika kami tidak bisa memenuhi janji, uang Anda akan dikembalikan sebagian dari sisa yang tidak dapat diselesaikan.'
    },
    {
        icon: icons.RiShieldKeyholeLine,
        name: 'Keamanan Data',
        description: 'Kami menjaga kerahasiaan akun dan data Anda, sehingga Anda bisa mempercayakan akun anda pada kami.'
    },
    {
        icon: icons.PiVideoLight,
        name: 'Pantau Progress',
        description: 'Kami akan memberi link streaming saat sedang mengerjakan akun Anda sehingga progress dapat dilihat secara langsung.'
    },
];

const Why = () => {
    const { isDarkTheme } = useTheme();
    return (
        <section className="py-20 mt-20">
            <div className="mx-auto mb-8 text-center">
                <h2 className="text-2xl md:text-5xl font-bold mb-1 md:mb-10 font-Poppins">Kenapa Harus Pilih Joki Disini?</h2>
            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-stretch justify-center">
                {WhyItems.map((item, index) => (
                    <AnimationInBottom key={index} delay={(index + 1) * 0.2} duration={1} once={false}>
                        <div
                            key={index}
                            className={`${isDarkTheme ? 'bg-slate-800 border-gray-600' : 'bg-white border-gray-300'} shadow-lg rounded-2xl p-6 flex flex-col h-full`}
                        >
                            <div className='flex flex-row md:flex-col items-center md:items-center'>
                                <div className="h-16 md:h-24 w-16 md:w-24 flex items-center justify-center mb-2">
                                    <item.icon className={`h-24 w-24 ${isDarkTheme ? 'text-sky-500' : 'text-[#3B82F6]'}`} />
                                </div>
                                <h3 className="font-bold font-Poppins text-2xl md:text-4xl mb-2 text-center">{item.name}</h3>
                            </div>
                            <p className="text-lg md:text-xl font-Poppins text-justify flex-grow">{item.description}</p>
                        </div>
                    </AnimationInBottom>
                ))}
            </div>
        </section>
    );
};

export default Why;
