import React, { useState } from 'react';


export default function LogTable(props) {
    
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openDetailsModal = (product) => {
        setSelectedProduct(product);
      };
    
      const closeDetailsModal = () => {
        setSelectedProduct(null);
      };

  return (
    <div className='w-[100%] lg:ml-72 sm:ml-20 md:ml-40 '>
        <table className="min-w-[80%]  table-auto divide-y  divide-gray-200">
                <thead className="bg-gray-50 ">
                    <tr>
                    <th scope="col" className="px-6 py-3 float-start justify-items-end text-lg font-medium text-black uppercase tracking-wider">
                        Product Name
                    </th>
                    <th scope="col" className="px-6 py-3  justify-items-center text-lg font-medium text-black uppercase tracking-wider">
                        User Type
                    </th>
                    <th scope="col" className="px-6 py-3  justify-items-center  text-lg font-medium text-black uppercase tracking-wider">
                        Time
                    </th>
                    <th scope="col" className="px-6 py-3  justify-items-center  text-lg font-medium text-black uppercase tracking-wider">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3 float-right text-lg font-medium text-black uppercase tracking-wider">
                        Product Details
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {props.data.map((product, index) => (
                    <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" float-start text-gray-900">{product.productName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">{product.brand}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">{product.createdTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">{product.CreatedData}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900 float-right"><button className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 ' onClick={() => openDetailsModal(product)}>View Details</button></div>
                    </td>
                    </tr>
                    ))}
                    </tbody>
            </table>
            {selectedProduct && (
        <div className="modal float-end mr-[20%] w-[20%]  bg-gray-50  text-black rounded-sm">
          <div className="modal-content  bg-gray-50 ">
            <button className=" text-white bg-gradient-to-t from-red-600 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-700 dark:focus:ring-red-700 shadow-lg shadow-red-700 dark:shadow-lg dark:shadow-red-700 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 " onClick={closeDetailsModal}>Close</button>
            <h1 className='font-bold text-lg'>Product Details</h1>
            <ul >
              {Object.entries(selectedProduct).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
