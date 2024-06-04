import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../../components/SensorManager/Product';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';


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
            const response = await fetch('http://localhost:3000/api/product/sensormanagerproducts', config);
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
        <div className='bg-backgroundGreen flex h-full min-h-screen w-full min-w-screen'>
          <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
          <Sidebar type="sensormanager" />
          </div>
          <div className="w-full min-w-screen sm:w-3/4 ml-0 h-full min-h-screen sm:ml-64 z-10">
            <Navbar type='sensormanager'/>
            <div className='flex justify-between w-full min-w-screen'>
            <h1 className=' mb-8 ml-24 mt-32 text-3xl font-semibold text-sidebarGreen'>
               Products
            </h1>
            {/* <GridListView type="annotated" videoData={annotatedVideoData}/> */}
           
            
          </div>
          <div className=''>
            <Product productData={productData} />
            </div>
          </div>
        </div>
    );
}

export default Products
