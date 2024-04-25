import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/image2.svg'
const Addfood = () => {

    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false);
    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }
    
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', file);
    
            const { data } = await axios.post('http://localhost:8008/api/v1/all/upload-image', formData);
    
            setImage({
                url: data.url,
                public_id: data.public_id
            });
              if(uploading===false){
            toast.success('Successfully uploaded');
              }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const price = form.price.value;
        const category = form.category.value;
        const weight = form.weight.value;
        const location = form.location.value;
        const description = form.description.value;
        const foodImage = image?.url;
        const foodData = { name, price, foodImage, category, location, description, weight };
        const res = await axios.post('http://localhost:8008/api/v1/food/addfood', { name, price, foodImage, category, location, description, weight}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (res.data.success) {
            toast.success(res.data.message)
            form.reset();
        }
        else {
            console.error('Error adding food:', error);
            toast.error(res.data.message)
        }
    }
    return (
        <div className='addfood'>
            <div className='w-full mx-auto pt-[16vh]'>
                <form className='ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto  items-center rounded-md px-8 py-5' onSubmit={handleSubmit}>

                    <NavLink to='/'>
                        <img src={logo} alt='' className='logo mx-auto mb-6 cursor-pointer text-center' />

                    </NavLink>
                    <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-4 '>

                        <input type='text' name='name' placeholder='Enter food name' className='input input-bordered shadow-sm bg-white apperance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <input type='file' className='file-input file-input-bordered bg-red-500 text-white file-input-md  w-full' accept='.jpeg, .png, .jpg' name='myfile' onChange={handleImage} />
                        <input type='number' name='price' placeholder='Enter Price' className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />

                        <select className='select bg-red-500 text-white  select-md w-full max-w-xs' name="category">
                            <option disabled selected>Category</option>
                            <option >Rice</option>
                            <option >Desert</option>
                            <option >Drinks</option>
                            <option >Fruits</option>
                            <option >Chicken</option>
                        </select>


                        <input type='number' name='weight' placeholder='Enter Weight' className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <input type='text' name='location' placeholder='Enter Location' className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <textarea className='textarea textarea-ghost shadow-sm bg-white appearace-none border rounded w-full py-3 px-3 col-span-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name='description' placeholder='Description'></textarea>

                    </div>
                    <button type='submit' className=' mb-3 mt-5 bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center'>Add Food</button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default Addfood
