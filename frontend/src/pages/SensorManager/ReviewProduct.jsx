import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Product from '../../components/SensorManager/Product';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import API from '../../config/config';

function ReviewProduct() {
  const {productId} = useParams();
  const [responseData, setResponseData] = useState([]);
  const navigate = useNavigate();
  let [isEnlarge, setEnlarge] = useState(true);
 
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("token:", token);

      setTimeout(() => {
        // Remove token from local storage after 5 seconds
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }, 7200000); // 2hours


      if (token) {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        };
        const response = await axios.get(`${API}/api/product/similarproducts/${productId}` , config);
        setResponseData(response.data);
        console.log("Respose:"+response.data[0]);

      }else{
        navigate('/')
      }
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        // setLoading(false);
      }
    };
  
    fetchReviewDetails();
  }, [productId]);

  const handleValueChange = (value) => {
    console.log(value)
    if(value==true){
      setEnlarge(true);
    }else{
      setEnlarge(false);
    }
  };


  return ( 
    <div className='bg-backgroundGreen flex h-full min-h-screen w-full min-w-screen'>
          <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
          <Sidebar type="sensormanager" onValueChange={handleValueChange} />
          </div>
          <div className={`w-full mb-10 min-w-screen center-l lg md:w-[75%] sm:w-auto ml-0 sm:ml-auto flex flex-col ${isEnlarge ? 'lg:w-[85%] md:w-[75%]' : 'lg:w-[90%] md:w-[100%]'}`}>
            <Navbar type='sensormanager'/>
          
          <div className='mt-12'>
          <VideowithReview Id={productId} text={"product"}/>
          </div>
            
           
            
         

          <div className=" flex items-end justify-center z-10 h-full"> {/* Position cancel button at the bottom */}
        
      </div>

      <h1 className='text-xl mt-12 ml-8 font-semibold justify-left'>
          Existing products related to this product
       </h1>

          <Product productData={responseData} type={"review"}/>
          </div>
        </div>
  )
}

export default ReviewProduct
