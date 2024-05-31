import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddNewProduct from '../../components/button/AddNewProductBtn';
import ProductBar from '../../components/fields/ProductBar';
import LogTable from '../../components/tables/ProductTableAnnotator';
import BlankPage from '../../components/theme/BlankPage';

export default function AddedProduct() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        console.log("fetching session details..");
        const authData = localStorage.getItem('token');
        // console.log(authData)

        setTimeout(() => {
          // Remove token from local storage after 5 seconds
          localStorage.removeItem('token');
          localStorage.removeItem('email');
      }, 7200000); // 2hours

      if(authData){
        const {accessToken} = authData;
        console.log(accessToken);
        const config = {
          headers : {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true,
        };
      const response = await axios.get('http://localhost:3000/api/product/getAll', config);
      setAllProducts(response.data);
      setFilteredProducts(response.data); // Initially set filtered products to all products
      }
      else{
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilter = (filter) => {
    if (filter === 'all') {
      setFilteredProducts(allProducts);
    } else if (filter === 'updated') {
      // Filter updated products based on lastUpdatedTime
      const updatedProducts = allProducts.filter(product => product.lastUpdatedTime !== undefined);
      setFilteredProducts(updatedProducts);
    } else if (filter === 'lastDay') {
      // Filter products updated within the last day
      const lastDayProducts = allProducts.filter(product => {
        const lastDay = new Date();
        lastDay.setDate(lastDay.getDate() - 1);
        return new Date(product.lastUpdatedTime) > lastDay;
      });
      setFilteredProducts(lastDayProducts);
    } else if (filter === 'lastWeek') {
      // Filter products updated within the last week
      const lastWeekProducts = allProducts.filter(product => {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        return new Date(product.lastUpdatedTime) > lastWeek;
      });
      setFilteredProducts(lastWeekProducts);
    }
  };

  // console.log(filteredProducts);
  //console.log("hi"+handleFilter);
  return (
    <div className='w-full min-h-screen overflow-x-auto xl:overflow-hidden bg-backgroundGreen place-items-center'>
      <BlankPage type="annotator" />
      <div className='inline-flex ml-[11%] w-[80%]'>
        <h1 className="mb-8 mt-24 text-3xl font-semibold text-sidebarGreen">Product</h1>
        <AddNewProduct />
      </div>
      
      <div className='w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64'>
        <div className=''>
          <ProductBar handleFilter={handleFilter} />
          <LogTable products={filteredProducts} />
        </div>
      </div>    

      {/* <BlankPage type={type} /> */}
    </div>
  );
}
