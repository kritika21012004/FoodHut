import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useCartContext } from '../../context/cardContext';
import { useUserContext } from '../../context/userContext';

const MyOrder = () => {
    const { cartItems } = useCartContext();
    const { user } = useUserContext();
    const [order, setOrders] = useState([]);

    const getMyOrders = async () => {
        try {
            const orderItems = cartItems.map(item => ({
                food: item._id,
                qty: item.qty,
            }));
            const res = await axios.post(
                'http://localhost:8008/api/v1/order/getorder',
                {
                    userId: user?.user._id,
                    token: localStorage.getItem('token'),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (res.data.success) {
                setOrders(res.data);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };
 
    useEffect(() => {
        getMyOrders();
    }, [cartItems]);

    return (
        <div className=''>
            <div className='pt-14'>
                <div className='container mx-auto py-6'>
                    <div className='w-full bg-white px-10 py-5 text-black rounded-md'>
                        <div className='flex justify-between border-b pb-8'>
                            <h1 className='font-semibold text-2xl'>
                                My Food Cart
                            </h1>
                        </div>
                        <div className='mt-10 flex mb-5'>
                            <h3 className='font-semibold text-gray-900 text-xl uppercase w-2/5'>
                                Food details
                            </h3>
                            <h3 className='font-semibold text-gray-900 text-xl uppercase w-2/5'>
                                Category
                            </h3>
                            <h3 className='font-semibold text-gray-900 text-xl uppercase w-2/5'>
                                Price
                            </h3>
                            <h3 className='font-semibold text-gray-900 text-xl uppercase w-2/5'>
                                Total Price
                            </h3>
                        </div>
                        {cartItems?.map(food => (
                            <CartFood key={food.id} food={food} />
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MyOrder;


const CartFood = ({ food }) => {

    return (
        <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
            <div className='flex w-2/5'>
                <div className='grid grid-cols-3'>
                    <div className='flex flex-col justify-between ml-4 flex-grow'>
                        <div>
                            <img src={food?.foodImage} alt='' className='h-20' />
                        </div>
                        <span className='font-bold text-sm'>
                            {food?.name}
                        </span>
                        <span className='flex items-center space-x-4'>
                            qty:
                            <span className='text-red-500 px-3 py-2 bg-slate-50 text-lg font-medium'>
                                {food?.qty}
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className='flex justify-center w-1/5 cursor-pointer'>
                {food?.payment ? (
                    <span className='font-bold text-green-600 text-sm'>Paid</span>
                ) : (
                    <span className='font-bold text-sm'>Not paid</span>
                )}
            </div>
            <div className='flex justify-center w-1/5 cursor-pointer'>
                <span className='font-bold text-sm'>{food?.status}</span>
            </div>
            <span className='font-bold text-center w-1/5 text-sm'>
                {food?.createdAt}
            </span>
            <span className='font-bold text-center w-1/5 text-sm'>
                {food?.totalAmount}
            </span>
        </div>
    );
};
