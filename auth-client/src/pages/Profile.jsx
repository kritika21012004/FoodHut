import React, { useState } from 'react'
import avatar from '../assets/profileimage.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../context/userContext';

const Profile = () => {
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false);
    const { user, setUser } = useUserContext()
    const navigate = useNavigate();
    const handleImage = async (e) => {
      const file = e.target.files[0]
      let formData = new FormData()
      formData.append('image', file)
      setUploading(true)
      try {
        const { data } = await axios.post('http://localhost:8008/api/v1/all/upload-image', formData)
        setUploading(false)
        setImage({
          url: data.url,
          public_id: data.public_id
        })
        toast.success("Uploaded image")
      }
      catch (error) {
        console.log(error)
      }
    }



    const handleOnSubmit = async (event) => {
      event.preventDefault()
      const form = event.target
      const name = form.name.value
      const country = form.country.value;
      const city = form.city.value;
      const state = form.state.value;
      const zipCode = form.zipCode.value;
      const profileImage = image?.url
     
      try{
        const res=await axios.put(
          "http://localhost:8008/api/v1/user/update",{
            userId:user.user._id,
            name,
            country,
            city,
            state,
            zipCode,
            profileImage
          },{
            headers:{
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        if(res.data.success){
          toast.success(res.data.message);
          form.reset();
          location.reload();
          navigate("/")
        }
        else{
          toast.error(data.message);
        }
      }
      catch(error){
        console.log(error);
      }
    }

    
  return (
    <div className='profile'>
      <div className='w-full mx-auto pt-[16vh]'>
        <form className='ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto  items-center rounded-md px-8 py-5' onSubmit={handleOnSubmit}>

          <label htmlFor='file-upload' className='custom-file-upload'>
            <img src={image?.url || user?.user?.profileImage} alt='' className='h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer' />

          </label>
          <label className='block text-center text-gray-900 text-base mb-2'>
            Profile Picture
          </label>
          <input type='file' label='Image' name='myfile' id='file-upload' className='hidden' accept='.jpeg, .png, .jpg' onChange={handleImage} />

          {/* <div className='mb-3'>
            <label className='block text-gray-700 text-sm mb-2' htmlFor='name'>
              Name
            </label>
            <input type='text' name='name' placeholder='Enter your Name' className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
          </div>
          <div className='mb-3'>
            <label className='block text-gray-700 text-sm mb-2' htmlFor='email'>
              Email
            </label>
            <input type='email' name='email' disabled placeholder='Enter your email' className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
          </div>
          <div className='flex flex-col md:flex-row md:gap-4'>
            <div className='mb-3'>
              <label className='block text-gray-700 text-sm mb-2'>
                Password
              </label>
              <input type='password' name='password' placeholder='*****************' className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            </div>
            <div className='mb-3'>
              <label className='block text-gray-700 text-sm mb-2'>
                Confirm Password
              </label>
              <input type='password' name='confirmpassword' placeholder='**************' className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            </div>

          </div> */}

          <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-4 '>

                        <input type='text' name='name' placeholder={user?.user?.name} className='input input-bordered shadow-sm bg-white apperance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <input type='email' disabled name='email' placeholder={user?.user?.email}  className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <input type='text' name='country' placeholder={user?.user?.country || 'Country'} className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <input type='text' name='city' placeholder={user?.user?.city || 'city'} className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <input type='text' name='state' placeholder={user?.user?.state || 'state'} className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        <input type='text' name='zipCode' placeholder={user?.user?.zipCode || 'zipCode'} className='shadow-sm bg-white apperance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                      

                    </div>

          <button type='submit' className=' mb-3 mt-5 bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center'>Update Profile</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  )
}

export default Profile
