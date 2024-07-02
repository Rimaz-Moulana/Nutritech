import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import ProductDetails from './EditProductDetails';

function Product() {
  return (
    <div className='bg-backgroundGreen'>
      <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        {/* <AnnotatorSideBar /> */}
      </div>
      <div className="w-full sm:w-3/4 ml-0 h-full sm:ml-64">
        <Navbar />
        <h1 className="lg:ml-20 sm:ml-40 mb-8 mt-24 lg:mr-[750px] md:mr-50 sm:mr  text-3xl font-semibold text-sidebarGreen">Product Deatils</h1>
        {/* <h1 className=' mb-8 mt-24 text-3xl font-semibold text-sidebarGreen left-0'>
           All Videos
        </h1> */}
        <ProductDetails  />
      </div>
    </div>
  );
}

export default Product;
