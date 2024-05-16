import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

export default function LogTable({Products}) {
  const navigate = useNavigate();
  console.log(Products)
  const [loading, setLoading] = useState(true);
  const [product, setProducts] = useState([]);
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

  const filterKeys = ['_id', 'createdTime', 'CreatedData', '__v'];

  const handleEdit = (productId) => {
    navigate(`/product/${productId}`);
  };

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
      const videourl = `/videos/${desiredPart}`;
      console.log('Video URL:', videourl);
      return videourl;
    //}
  };

  return (
    <div className='w-full sm:text-sm sm:p-2'>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Product Name
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
                  {product.productName}
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
                     //console.log(product.imageFront)
                    <img 
                    className='fixed-bottom'
                    //src={require('E:/Nutritech/frontend/src/assets/videos/1711444464892-redflag.png')}
                    // src='frontend/src/assets/videos/1711444464892-blue.png'
                    // width='100%'
                    // height='100%'
                    // controls={true}
                    />
                   
                  }
                  {
                    <img 
                    className='fixed-bottom'
                    // src={handleurl(product.imageBack)}
                    // width='100%'
                    // height='100%'
                    // // controls={true}
                    />
                   
                  }
                  {
                    <img 
                    className='fixed-bottom'
                    // src={handleurl(product.imageLeft)}
                    // width='100%'
                    // height='100%'
                    // controls={true}
                    />
                   
                  }
                  {
                    <img 
                    className='fixed-bottom'
                    // src={handleurl(product.imageRight)}
                    // width='100%'
                    // height='100%'
                    // controls={true}
                    />
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                  {product.createdTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                  {product.CreatedData}
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
                  {selectedProductIndex === index && (
                    <div className="modal absolute z-10 top-full bg-gray-50 rounded-sm shadow-lg p-1" style={{ top: 'calc(100% + 5px)', right: 0 }}>
                      <button className="text-white bg-gradient-to-t from-red-600 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-700 dark:focus:ring-red-700 shadow-lg shadow-red-700 dark:shadow-lg dark:shadow-red-700 font-medium rounded-lg text-sm px-5 py-1 mr-1 mb-1 " onClick={closeDetailsModal}>Close</button>
                      <h1 className='font-bold text-lg'>Product Details</h1>
                      <ul>
                        {Object.entries(product).filter(([key, value]) => !filterKeys.includes(key)).map(([key, value]) => (
                          <li className='float-start' key={key}><strong>{key}:</strong> {value},</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
