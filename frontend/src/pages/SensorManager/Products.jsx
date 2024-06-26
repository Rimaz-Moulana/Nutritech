import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../../components/SensorManager/Product';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import API from '../../config/config';


function Products() {

    const [productData,setProductData] = useState([]);
    const navigate = useNavigate();

    useEffect (()=>{
        const fetchData = async () => {
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
            const response = await fetch(`${API}/api/product/sensormanagerproducts`, config);
            const data = await response.json();
            setProductData(data);
        }else{
          navigate('/')
        }
        };
        fetchData();
    },[])

console.log(productData)
    return (
      <div className='bg-backgroundGreen lg:overflow-x-hidden flex min-h-screen'>
      <div className="w-full fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Sidebar type="sensormanager"/>
      </div>
      <div className="w-full mb-10 sm:w-3/4 ml-0 h-full z-0 sm:ml-72">
        <div className='p-5'>
        <Navbar type='sensormanager' />
        </div>
        <h1 className=' mb-8 ml-24 mt-32 text-3xl font-semibold text-sidebarGreen'>
               Products
            </h1>
       
        <div className='flex mt-4 justify-between'>
        <h1 className='ml-8 mb-8 mt-4 h-4 text-3xl font-semibold text-sidebarGreen left-0'>Products</h1>
        </div>
        <div className='w-full mb-10 ml-0 h-full '>
        <div className='z-50'>
        <Product productData={productData} />
        </div>
      </div>   
      </div>
    </div>

    );
}

export default Products
