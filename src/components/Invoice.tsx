'use client'

import { useEffect, useState } from 'react' 
import { useSearchParams } from 'next/navigation'
import paymentMethods from '../../public/assets/data/PaymentMethod'
import { FaCartArrowDown } from "react-icons/fa";
import { useTheme } from '@/app/functions/ThemeContext'
import Image from 'next/image'

const Invoice = () => {
    const searchParams = useSearchParams()
    const { isDarkTheme } = useTheme()

    const userId = searchParams.get('userId') || ''
    const username = searchParams.get('username') || ''
    const server = searchParams.get('server') || ''
    const password = searchParams.get('password') || ''
    const note = searchParams.get('note') || ''
    const selectedItems = JSON.parse(searchParams.get('selectedItems') || '[]')
    const totalPrice = searchParams.get('totalPrice') || '0'
    const selectedMethods = JSON.parse(searchParams.get('selectedMethods') || '[]')
    const selectedOption = searchParams.get('selectedOption') || ''
    const totalPriceWithFee = searchParams.get('totalPriceWithFee') || '0'

    const [invoiceNumber, setInvoiceNumber] = useState('')

    const generateInvoiceNumber = () => {
        const randomNum = Math.floor(1000000000 + Math.random() * 9000000000).toString()
        setInvoiceNumber(randomNum)
    }

    useEffect(() => {
        generateInvoiceNumber()
    }, [])

    interface Item {
        item: string
        price: string
    }

    interface PaymentMethod {
        id: string
        name: string
        description: string
        options: {
            name: string
            fee: number
            image: string
        }[]
    }

    const sendToWhatsApp = () => {
        const message = `Halo, saya tertarik untuk menggunakan jasa joki Anda. Berikut adalah nomor invoice saya: ${invoiceNumber}. Terima kasih.`    
        const phoneNumber = '+6288216389495'
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }

    const sendToTelegram = async () => {
        const message = `
            Invoice Number: ${invoiceNumber}
            User ID: ${userId}
            Username: ${username}
            Region: ${server}
            Password: ${password}
            Note: "${note}"
            =====================================
            Paket yang Dipilih:
            ${selectedItems.map((item: Item) => {
            const price = parseInt(item.price.replace(/\D/g, ''), 10)
            return `- ${item.item}: Rp ${price.toLocaleString('id-ID')}`
        }).join('\n')}
            =====================================
            Metode Pembayaran:
            ${selectedMethods.map((methodId: string) => {
            const method = paymentMethods.find((method: PaymentMethod) => method.id === methodId)
            return `${method?.name} - "${method?.description}"`
        }).join('\n')}
            =====================================
            Penyedia Layanan:
            ${selectedMethods.map((methodId: string) => {
            const method = paymentMethods.find((method: PaymentMethod) => method.id === methodId)
            const option = method?.options.find(opt => opt.name === selectedOption)
            return option ? `${option.name} - Biaya admin ${option.fee}%` : ''
        }).join('\n')}
            =====================================
            Total: Rp ${parseInt(totalPrice).toLocaleString('id-ID')}
            Total dengan biaya admin: Rp ${parseInt(totalPriceWithFee).toLocaleString('id-ID')}`.replace(/^\s+/gm, '')
    
        const botToken = '8003150358:AAFWsdiIpRIg0JAmjLaWdscURiISP5TZ3mo' 
        const chatId = '1948400876'      
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                }),
            })
    
            const result = await response.json(); 
            console.log(result);
    
            if (!response.ok) {
                throw new Error('Failed to send message')
            }
    
            alert('Invoice terkirim ke Telegram')
        } catch (error) {
            console.error('Error:', error)
            alert('Gagal mengirim invoice ke Telegram')
        }
    } 
    
    const OrderNow = () => {
        sendToWhatsApp();
        sendToTelegram();
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-12'>
            <div className={`max-w-lg flex flex-col items-center col-1 ${isDarkTheme ? 'bg-black text-white' : 'bg- bg-white text-black'} transition-all duration-500 p-6 rounded-lg shadow-xl max-w-2xl w-full`}>
                <h1 className="text-3xl font-bold mb-4">Invoice</h1>
                <div className="w-full">
                    <p>Invoice Number: {invoiceNumber}</p>
                    <p>User ID: {userId}</p>
                    <p>Username: {username}</p>
                    <p>Region: {server}</p>
                    <p>Password: {password}</p>
                    <p>Note: &quot;{note}&quot;</p>
                    <h2 className="mt-4 mb-2 font-semibold">==========================</h2>
                    <h2 className="font-semibold">Paket yang Dipilih: </h2>
                    {selectedItems && selectedItems.length > 0 ? (
                        <ul className="list-disc pl-5 max-w-lg">
                            {selectedItems.map((item: Item, index: number) => (
                                <li key={index}>
                                    {item.item}: {item.price}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Tidak ada paket yang dipilih.</p>
                    )}
                    <h2 className="mt-4 mb-2 font-semibold">==========================</h2>
                    <h2 className="font-semibold">Metode Pembayaran:</h2>
                    {selectedMethods && selectedMethods.length > 0 ? (
                        <ul>
                            {selectedMethods.map((methodId: string) => {
                                const method = paymentMethods.find((method: PaymentMethod) => method.id === methodId)
                                if (method && method.options.some(option => option.name === selectedOption)) {
                                    return (
                                        <li key={method.id}>
                                            <strong>{method.name}</strong> - &quot;{method.description}&quot;
                                            <h2 className="mt-2 mb-1 font-semibold">----------------------------------</h2>
                                            <h2 className="font-semibold">Penyedia Layanan:</h2>
                                            <ul >
                                                {method.options
                                                    .filter(option => option.name === selectedOption)
                                                    .map(option => (
                                                        <li key={option.name} className="flex items-center">
                                                            <span>{option.name} - Biaya admin {option.fee}%</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </li>
                                    )
                                }
                                return null
                            })}
                        </ul>
                    ) : (
                        <p>Tidak ada metode pembayaran yang dipilih.</p>
                    )}
                    <h2 className="mt-4 mb-2 font-semibold">==========================</h2>
                    <h2 className="font-semibold">Total: Rp {parseInt(totalPrice).toLocaleString('id-ID')}</h2>
                    <h2 className="font-semibold">Total dengan biaya admin: Rp {parseInt(totalPriceWithFee).toLocaleString('id-ID')}</h2>
                </div>
                <button
                    onClick={OrderNow}
                    className="flex items-center w-full justify-center bg-sky-500 text-white text-xl py-3 px-6 rounded-lg hover:bg-sky-600 transition duration-300 my-5"
                >
                    <FaCartArrowDown className="mr-2" />
                    Pesan Sekarang
                </button>
            </div>
        </div>
    )
}

export default Invoice