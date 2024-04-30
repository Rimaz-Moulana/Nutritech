import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddNewProduct from '../../components/button/AddNewProductBtn';
import ProductBar from '../../components/fields/ProductBar';
import LogTable from '../../components/tables/LogTable';
import BlankPage from '../../components/theme/BlankPage';

export default function AddedProduct() {

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {type} = useParams()

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/product/getAll');
      setAllProducts(response.data);
      setFilteredProducts(response.data); // Initially set filtered products to all products
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

    <BlankPage type={type} />
    {/* <div className='inline-flex ml-[11%] w-[80%]'>
    <h1 className="mb-8 mt-24 text-3xl font-semibold text-sidebarGreen">Product</h1>
    <AddNewProduct />

    </div> */}
    </div>
  );
}
