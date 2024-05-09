import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Product({productData,type}) {
    // console.log("from component",productData);
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
  // Check if the product matches the filter criteria
  const productMatch = productFilter === 'all' || product.product === productFilter;
  
  // Check if the product's upload date matches the selected start date
  const uploadedDateMatch = !startDate || new Date(product.date).toLocaleDateString() === startDate.toLocaleDateString();
 
  // Return true if both productMatch and uploadedDateMatch conditions are satisfied
  return productMatch && uploadedDateMatch; 
});
  return (
    <div className='h-full h-min-screen mt-4 text-black w-full min-w-screen mb-24'>
    <div className='sm:w-auto right-0 flex mb-12 ml-12 justify-between'>
    <select className='bg-white text-xs p-1 items-end mt-2 mb-2 rounded w-[25%]'
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
              >
                <option value='all'>All Products</option>
                <option value='Confectionery'>Confectionery</option>
                <option value='Fine Bakery Wares'>Fine Bakery Wares</option>
                <option value='Bread and Ordinary Bakery Wares'>Bread and Ordinary Bakery Wares</option>
                <option value='Cereals'>Cereals</option>
                <option value='Potato,cereal or starch-based and animal based'>Potato,cereal or starch-based and animal based</option>
                <option value='Processed nuts'>Processed nuts</option>
                <option value='Fish-based'>Fish-based</option>
                <option value='Juices'>Juices</option>
                <option value='Milk and dairy based drinks'>Milk and dairy based drinks</option>
                <option value='Water based flavoured drink'>Water based flavoured drink</option>
                <option value='Coffee,coffee substitutes,tea, herbal infusions'>Coffee,coffee substitutes,tea, herbal infusions</option>
                <option value='Cereal,grain, tree nut-based beverages'>Cereal,grain, tree nut-based beverages</option>
                <option value='Frozen dairy based desserts and edible ices'>Frozen dairy based desserts and edible ices</option>
                <option value='Curded dairy based desserts'>Curded dairy based desserts</option>
                <option value='Cheese and analogues'>Cheese and analogues</option>
                <option value='Composite foods'>Composite foods</option>
                <option value='Fats and oils, and fat emulsions'>Fats and oils, and fat emulsions</option>
                <option value='Pasta and noodles and like products'>Pasta and noodles and like products</option>
                <option value='Fresh and frozen meat, poultry, game, fish and seafood products'>Fresh and frozen meat, poultry, game, fish and seafood products</option>
                <option value='Processed meat, poultry and game Products'>Processed meat, poultry and game Products</option>
                <option value='Processed fish and seafood products'>Processed fish and seafood products</option>
                <option value='Fresh and frozen fruits and vegetables,and legumes'>Fresh and frozen fruits and vegetables,and legumes</option>
                <option value='Processed fruits and vegetables'>Processed fruits and vegetables</option>
                <option value='Solid-form soybean Products'>Solid-form soybean Products</option>
                <option value='Sauces, dips, and dressings'>Sauces, dips, and dressings</option>
                <option value='Fats and oils, and fat emulsions'>Fats and oils, and fat emulsions</option>
    </select>

    <DatePicker
           className='bg-white mt-2 ml-4 p-1 mb-2 rounded'
              placeholderText='Select Date'
             selected={startDate}
             onChange={(date) => setStartDate(date)}
             isClearable
             dateFormat='MM/dd/YYYY'
           />
          {type==="review" && (
             <div className=" flex items-end justify-center z-10 h-full"> {/* Position cancel button at the bottom */}
             <button
                className='text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                >
                View Product Details
              </button>
           </div>
          )}
         
    </div>
    <div className='bg-white max-h-96 mt-12 ml-12 overflow-y-scroll p-4'>


   <table className='w-full'>
     {/* Table headers with filter dropdown for 'Status' and date picker for 'Uploaded Date' */}
     <thead>
       <tr>
        <th></th>
        <th>Brand {' '}</th>
         <th className=''> Product{' '}</th>
         <th className='mt-12'>Review Status</th>
         <th className='text-center mt-12'>Uploaded Date</th>
         <th className='mt-12'>Uploaded Time</th>
         {/* <th className='mt-12'>Uploader</th> */}
         
          
         {/* <th className='mt-12'>Actions</th>
         <th className='mt-12'>Actions</th> */}
         
       </tr>
     </thead>
     <tbody className='mt-12 text-black'>
       {filteredProducts.map((product, index) => (
         <tr key={index} className='border-b-1'>
          <td className='w-40'>
          </td>
          <td>{product.brand}</td>
           <td>{product.productName}</td>
           <td>{product.status}</td>
           {/* <td>{product.status}</td> */}
           <td>{product.CreatedData}</td>
           <td>{product.createdTime}</td>
           {/* <td>{product.uploader}</td> */}

           <td>
             <button
               className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-4 py-2.5 "
                //  onClick={() => handleReview(video._id)}
             >View Details</button>
          {/* )} */}
           </td>

            {product.status != "reviewed" && (
                <td>
                <button
                  className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen rounded-lg text-sm text-center me-2 mb-2 px-4 py-2.5 "
                    onClick={() => handleProduct(product._id)}
                >Review</button>

                </td>

            )}
         </tr>
       ))}
     </tbody>
   </table>
   </div>
 </div>
  )
}

export default Product
