'use client'

import { useState, useMemo, useRef, useEffect, Key } from 'react'
import { useRouter } from 'next/navigation'
import paymentMethods from '../../public/assets/data/PaymentMethod'
import { useTheme } from '@/app/functions/ThemeContext'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { MdOutlineShoppingCart } from "react-icons/md"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"
import Image from 'next/image'

interface Item {
    item: string
    price: string
}

interface Categories {
    "Rawat Akun"?: Item[];
    Explore?: Item[];
    Culus?: Item[];
    "Spiral Abyss"?: Item[];
    "Imaginarium Theater"?: Item[];
    Event?: Item[];
    Fishing?: Item[];
    Quest?: Item[];
    "Special Tasks"?: Item[];
    Story?: Item[];
    Farming?: Item[];
}

interface GameData {
    id: number
    logo: string
    name: string
    developer: string
    categories: Categories
}

interface OrderProps {
    gamesData?: GameData[]
    gameId: number
}

export default function Order({ gamesData, gameId }: OrderProps) {
    const router = useRouter()
    const { isDarkTheme } = useTheme()

    const gameData = gamesData?.find(game => game.id === gameId)

    const [selectedItems, setSelectedItems] = useState<Item[]>([])
    const [showMore, setShowMore] = useState(false)
    const [selectedMethods, setSelectedMethods] = useState<string[]>([])
    const [selectedOption, setSelectedOption] = useState<string | null>(null)

    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [note, setNote] = useState('')

    const [server, setServer] = useState('Asia')

    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const userIdRef = useRef<HTMLInputElement>(null)
    const userNameRef = useRef<HTMLInputElement>(null)
    const userPasswordRef = useRef<HTMLInputElement>(null)
    const userNoteRef = useRef<HTMLTextAreaElement>(null)

    const themeColors = useMemo(() => ({
        background: isDarkTheme ? 'bg-slate-800' : 'bg-white',
        text: isDarkTheme ? 'text-white' : 'text-black',
        secondaryBackground: isDarkTheme ? 'bg-slate-950' : 'bg-slate-100',
        border: isDarkTheme ? 'border-slate-300' : 'border-gray-300',
    }), [isDarkTheme])

    const handleSelectItem = (item: Item) => {
        setSelectedItems(prev =>
            prev.find(selected => selected.item === item.item)
                ? prev.filter(selected => selected.item !== item.item)
                : [...prev, item]
        )
    }

    const handleSelectMethod = (method: string) => {
        setSelectedMethods(prevMethods =>
            prevMethods.includes(method)
                ? prevMethods.filter(m => m !== method)
                : [...prevMethods, method]
        )
    }

    const totalPrice = selectedItems.reduce((total, { price }) => total + parseInt(price.replace(/[^\d]/g, '')), 0)

    const totalFeePrice = (optionName: string) => {
        let totalPriceWithFee = totalPrice
        selectedMethods.forEach((methodId) => {
            const selectedMethodData = paymentMethods.find((method: { id: string }) => method.id === methodId)
            const selectedOption = selectedMethodData?.options.find((option: { name: string }) => option.name === optionName)

            if (selectedOption) {
                const feePercentage = (totalPrice * selectedOption.fee) / 100
                totalPriceWithFee += feePercentage
            }
        })

        return totalPriceWithFee
    }

    const Section: React.FC<{ title: string; no: string; children: React.ReactNode }> = ({ title, no, children }) => (
        <div className={`${themeColors.background} ${themeColors.text} shadow-lg rounded-lg p-4 md:p-8 mx-4`}>
            <div className="flex gap-3 items-center mb-4">
                <h2 className="text-xl bg-sky-500 w-8 h-8 rounded-full font-semibold text-white flex justify-center items-center">{no}</h2>
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            <hr className={`border-t mb-4 ${themeColors.border}`} />
            {children}
        </div>
    )

    const Modal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
        if (!modalVisible) return null
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                    <p>{message}</p>
                    <button
                        onClick={onClose}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        OK
                    </button>
                </div>
            </div>
        )
    }

    const handlePurchase = () => {
        if (!userId.trim()) {
            setModalMessage('User ID tidak boleh kosong.')
            setModalVisible(true)
            userIdRef.current?.focus()
            return
        }
        if (!username.trim()) {
            setModalMessage('Username/Email tidak boleh kosong.')
            setModalVisible(true)
            userNameRef.current?.focus()
            return
        }
        if (!password.trim()) {
            setModalMessage('Password tidak boleh kosong.')
            setModalVisible(true)
            userPasswordRef.current?.focus()
            return
        }
        if (selectedItems.length === 0) {
            setModalMessage('Silakan pilih paket yang ingin dibeli.')
            setModalVisible(true)
            return
        }
        const totalPriceWithFee = totalFeePrice(selectedOption || "")

        router.push(`/invoice?${new URLSearchParams({
            userId,
            username,
            server,
            password,
            note,
            selectedItems: JSON.stringify(selectedItems),
            totalPrice: totalPrice.toString(),
            selectedMethods: JSON.stringify(selectedMethods),
            selectedOption: selectedOption || '',
            totalPriceWithFee: totalPriceWithFee.toString(),
        }).toString()}`)
    }

    useEffect(() => {
        const textarea = userNoteRef.current
        if (textarea) {
            textarea.focus()
            textarea.setSelectionRange(note.length, note.length)
        }
    }, [note])

    useEffect(() => {
        userPasswordRef.current?.focus()
    }, [password])

    useEffect(() => {
        userNameRef.current?.focus()
    }, [username])

    useEffect(() => {
        userIdRef.current?.focus()
    }, [userId])

    useEffect(() => {
        if (modalVisible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [modalVisible])

    if (!gameData) {
        return <div>Game not found</div>
    }

    return (
        <div className="max-w-7xl mx-auto my-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 md:gap-4 lg:gap-0">
                {/* Left Section - Game Info */}
                <div className="lg:col-span-1 mb-5 md:mb-0">
                    <div className={`${themeColors.background} ${themeColors.text} shadow-lg rounded-lg p-4 lg:p-5 mx-4 lg:mx-0`}>
                        <div className='grid grid-cols-2 lg:grid-cols-1 gap-4 items-center'>
                            <h2 className="hidden lg:flex text-2xl font-bold mt-4">{gameData.name}</h2>
                            <Image src={gameData.logo} alt={gameData.name} width={200} height={200} className="w-3/4 lg:w-full h-auto rounded" />
                            <h2 className="flex lg:hidden text-2xl font-bold mt-4 justify-center">{gameData.name}</h2>
                        </div>
                        <p className="my-2 mt-4 font-semibold">DESKRIPSI PRODUK</p>
                        <hr className="border-t my-4 border-slate-300" />

                        {showMore
                            ? "Kami mempersembahkan layanan yang cepat, murah, serta aman dan terpercaya! Tingkatkan akun anda dengan bantuan dari profesional kami. Kami mengutamakan kepuasan dan keamanan akun Anda dalam setiap jasa yang kami berikan. Setiap"
                            : ""
                        }
                        <button onClick={() => setShowMore(!showMore)} className="text-blue-500 underline mt-2 flex items-center">
                            {showMore ? 'Lihat lebih sedikit' : 'Lihat lebih banyak'}
                            {showMore ? <IoIosArrowUp className="ml-2" /> : <IoIosArrowDown className="ml-2" />}
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-4">
                    {/* User UID Information */}
                    <Section title="Masukkan Data Akun" no="1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Masukkan User ID Anda"
                                className={`border ${themeColors.border} ${themeColors.secondaryBackground} p-2 rounded-lg w-full`}
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                ref={userIdRef}
                                aria-label="Masukkan User ID Anda"
                            />
                            <select
                                className={`border ${themeColors.border} ${themeColors.secondaryBackground} ${themeColors.text} p-2 rounded-lg w-full`}
                                value={server}
                                onChange={(e) => setServer(e.target.value)}
                                aria-label="Pilih Server"
                            >
                                <option value="Asia">Asia</option>
                                <option value="NA">NA</option>
                                <option value="Europe">Europe</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Masukkan Username/Email Akun"
                                className={`border ${themeColors.border} ${themeColors.secondaryBackground} p-2 rounded-lg w-full`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                ref={userNameRef}
                                aria-label="Masukkan Username/Email Akun"
                            />
                            <input
                                type="text"
                                placeholder="Masukkan Password"
                                className={`border ${themeColors.border} ${themeColors.secondaryBackground} p-2 rounded-lg w-full`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                ref={userPasswordRef}
                                aria-label="Masukkan Password"
                            />
                            <textarea
                                ref={userNoteRef}
                                placeholder="Ketik Catatan Untuk Penjoki"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className={`${themeColors.border} ${themeColors.secondaryBackground} border p-2 rounded-lg w-full sm:col-span-2 resize-none`}
                                aria-label="Ketik Catatan Untuk Penjoki"
                                rows={4}
                                tabIndex={-1}
                            />
                        </div>
                        <p className="text-sm font-semibold mt-2">Pastikan untuk membaca semua informasi, syarat & ketentuan sebelum melakukan pemesanan untuk memastikan bahwa Anda mendapatkan layanan terbaik dan sesuai ekspektasi.</p>
                    </Section>

                    {/* Category and Item Selection */}
                    <Section title="Pilih Paket" no='2'>
                        {gameData.categories && Object.entries(gameData.categories).length > 0 ? (
                            Object.entries(gameData.categories).map(([category, items], idx) => (
                                <div key={idx}>
                                    <h4 className="text-lg text-sky-500 font-semibold mb-1">{category}</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
                                        {items.map((item: Item, index: Key | null | undefined) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSelectItem(item)}
                                                className={`p-4 rounded-lg text-center shadow-md transition-transform duration-300
                        ${selectedItems.includes(item) ? 'bg-blue-500 text-white' : `${themeColors.secondaryBackground} ${themeColors.text}`}`}
                                            >
                                                <span>{item.item}</span>
                                                <p className="text-sm text-gray-500">{item.price}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Tidak ada paket tersedia untuk saat ini.</p>
                        )}
                    </Section>

                    {/* Display selected items and total price */}
                    <Section title="Paket Yang Dipilih" no='3'>
                        <div className={`${themeColors.background} ${themeColors.text} border-dotted border-sky-500 border-2 shadow-lg rounded-lg p-4 md:p-8`}>
                            {selectedItems.length === 0 ? (
                                <p className="text-gray-500">Belum ada item yang dipilih.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {selectedItems.map((item, index) => (
                                        <div key={index} className={`${themeColors.secondaryBackground} ${themeColors.text} p-2 rounded-lg`}>
                                            <li className="flex justify-between">
                                                <span>{item.item}</span>
                                                <span>{item.price}</span>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <hr className="border-t my-4 border-slate-300" />
                        <div className="flex justify-between font-semibold">
                            <span>Total Harga:</span>
                            <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                        </div>
                    </Section>



                    <Section title='Pilih Metode Pembayaran' no='4'>
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className={`cursor-pointer p-4 border rounded-lg mb-4 ${themeColors.secondaryBackground} ${themeColors.text}`}
                                onClick={() => handleSelectMethod(method.id)}
                            >
                                <div className='flex justify-between items-center'>
                                    <p className="font-bold">{method.name}</p>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{method.description}</p>
                                <div className='flex justify-between items-center'>
                                    {selectedMethods.includes(method.id) && (
                                        <div className='flex flex-col gap-2 w-full mb-5'>
                                            {method.options.map((option) => (
                                                <button
                                                    key={option.name}
                                                    className={`p-2 border rounded-lg flex justify-between items-center 
                          ${selectedOption === option.name ? 'border-blue-500 border-2' : 'border-gray-200'} 
                          ${isDarkTheme ? 'bg-slate-800' : 'bg-white'}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setSelectedOption(prev => prev === option.name ? null : option.name)
                                                    }}
                                                >
                                                    <div>
                                                        <Image src={option.image} width={50} height={50} className={`${isDarkTheme ? 'bg-slate-500' : ''} rounded-xl`} alt={`${option.name} Icon`} />
                                                        <p className="font-bold text-center">{option.name}</p>
                                                    </div>
                                                    <p className="text-sm font-semibold">Rp {totalFeePrice(option.name).toLocaleString('id-ID')}</p>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    <div className={`${!selectedMethods.includes(method.id) ? 'flex' : 'hidden'}`}>
                                        {method.options.map((option, index) => (
                                            <Image key={index} src={option.image} width={50} height={50} className={`${isDarkTheme ? 'bg-slate-800' : ''} rounded-xl mr-2`} alt={`${option.name} Icon`} />
                                        ))}
                                    </div>
                                    <div className={`${!selectedMethods.includes(method.id) ? 'flex' : 'hidden'}`}>
                                        {selectedMethods.includes(method.id) ? <FaAngleUp /> : <FaAngleDown />}
                                    </div>
                                </div>
                                <div className={`${selectedMethods.includes(method.id) ? 'flex justify-end' : 'hidden'}`}>
                                    {selectedMethods.includes(method.id) ? <FaAngleUp /> : <FaAngleDown />}
                                </div>
                            </div>
                        ))}
                    </Section>

                    <button
                        onClick={handlePurchase}
                        className={`flex items-center justify-center m-4 px-4 py-2 rounded-md ${userId && username && password && selectedItems.length > 0 && selectedOption ? 'bg-sky-500 cursor-pointer' : 'bg-gray-500 cursor-not-allowed'}`}
                        disabled={!userId || !username || !password || selectedItems.length === 0 || !selectedOption}
                    >
                        <MdOutlineShoppingCart className='mr-2' />
                        Pesan Paket
                    </button>

                </div>
            </div>

            {/* Render Modal */}
            <Modal message={modalMessage} onClose={() => setModalVisible(false)} />
        </div>
    )
}