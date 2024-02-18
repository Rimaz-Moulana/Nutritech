import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddNewProduct from '../../components/button/AddNewProductBtn';
import ProductBar from '../../components/fields/ProductBar';
import LogTable from '../../components/tables/LogTable';
import BlankPage from '../../components/theme/BlankPage';

export default function AddedProduct() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);
  
  const fetchData = async () => {
    
    try {
      console.log("hi")
      const response = await axios.get('http://localhost:3000/api/product/getAll'); // Replace 'YOUR_API_ENDPOINT_HERE' with your actual API endpoint
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  

  };
  return (
    <div className='w-full overflow-x-auto xl:overflow-hidden bg-backgroundGreen'>
    <BlankPage />
    <div className='inline-flex ml-[11%] w-[80%]'>
    <h1 className="mb-8 mt-24 text-3xl font-semibold text-sidebarGreen">Product</h1>
    <AddNewProduct />
    </div>
    <ProductBar />
    <LogTable data={products} />
    </div>
  )
}
