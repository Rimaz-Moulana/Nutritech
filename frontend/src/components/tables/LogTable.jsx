import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogTable(props) {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  const openDetailsModal = (index) => {
    setSelectedProductIndex(index);
  };

  const closeDetailsModal = () => {
    setSelectedProductIndex(null);
  };

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

  console.log(products)
  const filterKeys = ['_id', 'createdTime', 'CreatedData','__v']; // Add the keys you want to filter out

  const handleEdit = (productId) => {
    
    navigate(`/product/${productId}`);
    console.log(productId)
  };


  return (
    <div className='w-[100%] sm:text-sm sm:p-2'>
      <table className="min-w-[100%] ml-4 table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 float-start justify-items-end text-lg font-medium text-black uppercase tracking-wider">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3 justify-items-center text-lg font-medium text-black uppercase tracking-wider">
              User Type
            </th>
            <th scope="col" className="px-6 py-3 justify-items-center text-lg font-medium text-black uppercase tracking-wider">
              Time
            </th>
            <th scope="col" className="px-6 py-3 justify-items-center text-lg font-medium text-black uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 float-right text-lg font-medium text-black uppercase tracking-wider">
              Product Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* {index<=5 && ( */}
          {products.map((product, index) => (
            index<3 && (
              
            <tr key={index}>
              <td className="px-1 whitespace-nowrap">
                <div className="float-start text-gray-900">{product.productName}</div>
              </td>
              <td className="whitespace-nowrap">
                <div className="text-gray-900">{product.brand}</div>
              </td>
              <td className="whitespace-nowrap">
                <div className="text-gray-900">{product.createdTime}</div>
              </td>
              <td className="whitespace-nowrap">
                <div className="text-gray-900">{product.CreatedData}</div>
              </td>
              <td className=" whitespace-nowrap">
                <div className="text-gray-900 float-right relative ">
                  <button
                    className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2'
                    onClick={() => openDetailsModal(index)}>View Details</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2" onClick={() => handleEdit(product._id)}>Edit</button>
                  {selectedProductIndex === index && (
                    <div className="modal absolute z-10 top-full bg-gray-50 rounded-sm shadow-lg p-1"     style={{ top: 'calc(100% + 5px)', right: 0 }}>
                      <button className=" text-white bg-gradient-to-t from-red-600 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-700 dark:focus:ring-red-700 shadow-lg shadow-red-700 dark:shadow-lg dark:shadow-red-700 font-medium rounded-lg text-sm px-10 py-1 text-center me-1 mb-1 " onClick={closeDetailsModal}>Close</button>
                      <h1 className='font-bold text-lg'>Product Details</h1>
                      <ul >
                        {Object.entries(product).filter(([key, value]) => !filterKeys.includes(key)).map(([key, value]) => (
                          <li className='float-start' key={key}><strong>{key}:</strong> {value} ,</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </td>
            </tr>
            )
          ))}
          {/* )} */}
        </tbody>
      </table>
    </div>
  );
}
