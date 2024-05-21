import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../../components/SensorManager/Product';
import VideowithReview from '../../components/SensorManager/VideowithReview';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';

function ReviewProduct() {
  const {productId} = useParams();
  const [responseData, setResponseData] = useState([]);
 
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/similarproducts/${productId}`);
        setResponseData(response.data);
        console.log("Respose:"+response.data[0]);
      } catch (error) {
        console.error('Error fetching ReviewDetails:', error);
      } finally {
        // setLoading(false);
      }
    };
  
    fetchReviewDetails();
  }, [productId]);
console.log(responseData)
  return ( 
    <div className='bg-backgroundGreen flex h-full min-h-screen w-full min-w-screen'>
          <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
          <Sidebar type="sensormanager" />
          </div>
          <div className="w-full min-w-screen sm:w-3/4 ml-0 h-full min-h-screen sm:ml-64 z-10">
            <Navbar type='sensormanager'/>
          
            <VideowithReview Id={productId} text={"product"}/>
           
            
         

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
