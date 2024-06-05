import React, { useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

export default function LogTable({Products}) {
  const navigate = useNavigate();
  console.log(Products)
  const [loading, setLoading] = useState(true);
  //const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  // setProducts(products);
  const openDetailsModal = (index) => {
    setSelectedProductIndex(index);
  };

  const closeDetailsModal = () => {
    setSelectedProductIndex(null);
  };

  // useEffect(() => {
  //   // Fetch data when the component mounts
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/api/product/getall');
  //     setProducts(response.data);
  //     console.log(product);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const handleEdit = (productId) => {
  //   navigate(`/product/${productId}`);
  // };

//   const handleUrlImage = (inputurl) => {
//     const url = inputurl.replace(/\\/g, '/');
//     const desiredPart = url.split("/").pop();
//     const imageUrl = `/vide`
//   }

  const handleurl = (inputurl) => {
    // if (loading) {
    //   console.log('Video data is still loading');
    //   return null;
    //} else {
      const url = inputurl.replace(/\\/g, '/');
      const desiredPart = url.split('/').pop();
      const cleanedPart = desiredPart.replace(/^\d+-/, '');
      const videourl = `/videos/${cleanedPart}`;
      console.log('Video URL:', videourl);
      return videourl;
    //}
  };

  const handleUrlImage = (inputurl) => {
      const url = inputurl.replace(/\\/g, '/');
      const desiredPart = url.split('/').pop();
      const cleanedPart = desiredPart.replace(/^\d+-/, '');
      const imageurl = `/${ cleanedPart}`;
      console.log('Image URL:',imageurl);
      return imageurl;

      
  }

  const filterKeys = ['_id', 'createdIn', 'createdAt', '__v', 'imageLeft','imageRight','imageFront','imageBack', 'videoPath']; // Add the keys you want to filter out


  return (
    <div className='w-full sm:text-sm sm:p-2'>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Product & Brand Name 
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Uploader
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Video
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Images
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Product Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          
            {Products.map((product, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                  {product.product+","+product.brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                  {product.brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                
                  {
                    <ReactPlayer
                    className='react-player fixed-bottom'
                    url={handleurl(product.videoPath)}
                    width='100%'
                    height='100%'
                    controls={true}
                    />
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                {
                    
                    <img 
                    className='fixed-bottom'
                    src={handleUrlImage(product.imageFront)}
                    width='50%'
                    height='50%'
                    />
                   
                  }
                  {
                    <img 
                    className='fixed-bottom'
                    src={handleUrlImage(product.imageBack)}
                    width='50%'
                    height='50%'
                    />
                   
                  }
                  {
                    <img 
                    className='fixed-bottom'
                    src={handleUrlImage(product.imageLeft)}
                    width='50%'
                    height='50%'
                    />
                   
                  }
                  {
                    <img 
                    className='fixed-bottom'
                    src={handleUrlImage(product.imageRight)}
                    width='50%'
                    height='50%'
                    />
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                  {product.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                  {product.createdIn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                  <div className="text-center">
                    <button
                      className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                      onClick={() => openDetailsModal(index)}>View Details</button>
                    {/* <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={() => handleEdit(product._id)}>Edit</button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={!!Products}
        onRequestClose={closeDetailsModal}
        contentLabel="Product Details"
        className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        {Products && (
          <div className="bg-white mt-8 rounded-lg p-4 w-full max-w-7xl">
            <button className="text-white bg-gradient-to-t from-red-600 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-700 dark:focus:ring-red-700 shadow-lg shadow-red-700 dark:shadow-lg dark:shadow-red-700 font-medium rounded-lg text-sm px-5 py-1 mr-1 mb-1" onClick={closeDetailsModal}>Close</button>
            <h1 className='font-bold text-xl mb-2'>Product Details</h1>
            <div className="grid grid-cols-5 gap-9">
              {Object.entries(Products).filter(([key]) => !filterKeys.includes(key)).map(([key, value]) => (
                <div key={key} className='flex flex-col'>
                  <strong>{key}:</strong> <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
