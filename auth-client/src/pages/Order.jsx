import React from 'react'
import logo from '../assets/image2.svg'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCartContext } from '../../context/cardContext';
import { useUserContext } from '../../context/userContext';
import { useStripe } from '@stripe/react-stripe-js'
import axios from 'axios';

const Order = () => {

    const { cartItems, removeItem, addToCart } = useCartContext()
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty + c.price, 0)
    const taxPrice = itemsPrice * 0.14;
    const taxpriceLength = taxPrice.toFixed(2);
    const shippingPrice = itemsPrice > 2000 ? 0 : 20
    const totalPrice = itemsPrice + shippingPrice + parseInt(taxpriceLength)

    const { user } = useUserContext()
    const stripe = useStripe()

    const handleFinish = async () => {
        console.log("process 1");
        try {
            const orderItems = cartItems.map(item => ({
                food: item._id,
                qty: item.qty,
            }))
            console.log("process 2");
            const res = await axios.post(`https://localhost:8008/api/v1/order/order`, {
                user: user?.user._id,
                items: orderItems,
                totalAmount: totalPrice,
                token:localStorage.getItem("token")
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("process 3");
            if (res.data.success) {
                const result = await stripe.redirectToCheckout({ sessionId:res.data.sessionId })
                toast.success(res.data.message)
            }
            else {
                toast.error(res.data.message)
            }
        }

        // try{
            
        //     const orderItems = cartItems.map(item => ({
        //                 food: item._id,
        //                 qty: item.qty,
        //             }))
        //     console.log(orderItems);
        //     // toast.success("resolved");
        // }
        catch (error) {
            console.log(error);
            toast.error('something went wrong')
        }
    }

    return (
        <div className='h-screen pt-[16vh]'>
            <form className='ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-[28rem] mx-auto flex flex-col items-center rounded-md px-8 py-5'>
                <NavLink to='/'>
                    <img src={logo} alt='' className='logo mb-6 cursor-pointer text-center' />

                </NavLink>
                <div className='text-xl text-[#2e2e2e] mb-3'>
                    items Price:<span className='text-[#f454748]'>${itemsPrice}</span>
                </div>
                <div className='text-xl text-[#2e2e2e] mb-3'>
                    Tax Price:<span className='text-[#f454748]'>${taxpriceLength}</span>
                </div>
                <div className='text-xl text-[#2e2e2e] mb-3'>
                    Shipping Price:<span className='text-[#f454748]'>${shippingPrice}</span>
                </div>
                <div className='text-xl text-[#2e2e2e] mb-3'>
                    Total Price:<span className='text-[#f454748]'>${totalPrice}</span>
                </div>
                <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center' onClick={handleFinish} >pay ${totalPrice}</button>
                <ToastContainer />
            </form>
        </div>
    )
}
export default Order

