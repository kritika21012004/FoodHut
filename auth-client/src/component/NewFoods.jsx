import React, { useEffect, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import image15 from '../assets/image15.png'
import image12 from '../assets/image12.png'
import image11 from '../assets/image11.png'
import image13 from '../assets/image13.png'
import image5 from '../assets/image5.png'
import image8  from '../assets/image8.png'
import image14 from '../assets/image14.png'
import image6 from '../assets/image6.png'
import image9 from '../assets/image9.png'
import image10 from '../assets/image10.png'
import image17 from '../assets/image17.png'
import image3 from '../assets/image3.png'
import { useFoodContext } from '../../context/foodContext'
import axios from 'axios'
import Foods from './Foods'
const NewFoods = () => {
    const [newfood,setNewFood]=useState([])
    const {food, setFood} = useFoodContext()
    const getFoods = async () => {
        try {
            const res = await axios.get('http://localhost:8008/api/v1/food/getNewFoods')
            if (res.data.success) {
                setNewFood(res.data.data.food)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    // console.log(newfood)
    useEffect(() => {
        getFoods()
    }, [newfood])
  return (
    <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
            <div className='container mx-auto py-[2vh]'>
                <div className='text-2xl  md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl'>
                    New <span className='text-[#f54748]'>Foods</span>
                </div>
                <div className='grid py-6 gap-8  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
              {
                newfood?.map(curElem => <Foods curElem={curElem}/>)
              }
                   
                </div>
            </div>

        </div>
  )
}

export default NewFoods




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Foods from './Foods';
// import { useFoodContext } from '../../context/foodContext';

// const NewFoods = () => {
//     const [newfood, setNewFood] = useState([]);
//     const { food,setFood } = useFoodContext();

//     useEffect(() => {
//         const getFoods = async () => {
//             try {
//                 const res = await axios.get('http://localhost:8008/api/v1/food/getNewFoods');
//                 if (res.data.success) {
//                     setNewFood(res.data.data.food);
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         getFoods();
//     }, [newfood]);

//     return (
//         <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
//             <div className='container mx-auto py-[2vh]'>
//                 <div className='text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl'>
//                     New <span className='text-[#f54748]'>Foods</span>
//                 </div>
//                 <div className='grid py-6 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
//                     {newfood.map((curElem) => (
//                         <Foods key={curElem.id} curElem={curElem} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NewFoods;
