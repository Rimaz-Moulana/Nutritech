import { Datepicker } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Product({productData}) {
    // console.log(productData)
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    let fact;
  
    const [productFilter, setProductFilter] = useState(() => {
      return localStorage.getItem('productFilter') || 'all';
    });


  
    useEffect(() => {
      // Update localStorage when productFilter changes
      localStorage.setItem('productFilter', productFilter);
    }, [productFilter]);
  
  const handleProduct = (productId) => {
    navigate(`/reviewproduct/${productId}`);
}
    
  
  const filteredProducts = productData?.filter((product) => {
    const productMatch = productFilter === 'all' || product.product === productFilter;
    
    const uploadedDateMatch = !startDate || new Date(product.date).toLocaleDateString() == startDate.toLocaleDateString();   
    return productMatch && uploadedDateMatch; 
  });

  return (
    <div className='h-full h-min-screen mt-4 text-black w-full min-w-screen'>
    <div className='flex mb-12 ml-12'>
    <select className='bg-white p-1 items-end mt-2 mb-2 rounded'
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value='all'>All Products</option>
                <option value='Biscuits'>Biscuits</option>
                <option value='Dairy'>Dairy</option>
                <option value='Margarine'>Margarine</option>
                <option value='Noodles'>Noodles</option>
                <option value='Soft drinks'>Soft Drinks</option>
                <option value='Bakery items'>Bakery Items</option>
                <option value='Confectionary'>Confectionary</option>
                <option value='Other'>Other</option>
    </select>

           <Datepicker
           className='bg-white mt-2 ml-4 p-1 mb-2 rounded'
              placeholderText='Select Date'
             selected={startDate}
             onChange={(date) => setStartDate(date)}
             isClearable
             dateFormat='MM/dd/YYYY'
           />
    </div>
    <div className='bg-white max-h-96 mt-12 ml-12 overflow-y-scroll'>
   <table className='w-full mt-8'>
     {/* Table headers with filter dropdown for 'Status' and date picker for 'Uploaded Date' */}
     <thead>
       <tr className='mt-12'>
        <th></th>
        <th>Brand {' '}</th>
         <th className=''> Product{' '}</th>
         <th className='text-center mt-12'>Uploaded Date</th>
         <th className='mt-12'>Uploaded Time</th>
         <th className='mt-12'>Uploader</th>
      
          
         <th className='mt-12'>Actions</th>
         <th className='mt-12'>Actions</th>
         
       </tr>
     </thead>
     <tbody className='mt-12 text-black'>
       {filteredProducts.map((product, index) => (
         <tr key={index} className='border-b-1'>
          <td className='w-40'>
          </td>
          <td>{product.brand}</td>
           <td>{product.productName}</td>
           {/* <td>{product.status}</td> */}
           <td>{product.createdIn}</td>
           <td>{product.createdAt}</td>
           <td>{product.uploader}</td>

           <td>
             <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-4 py-2.5 "
                 onClick={() => handleProduct(product._id)}
             >Review</button>
         
           </td>

           <td>
             <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-4 py-2.5 "
                //  onClick={() => handleReview(video._id)}
             >View Details</button>
          {/* )} */}
           </td>
         </tr>
       ))}
     </tbody>
   </table>
   </div>
 </div>
  )
}

export default Product
