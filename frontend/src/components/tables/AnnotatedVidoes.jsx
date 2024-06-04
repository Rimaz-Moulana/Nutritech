import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

export default function LogTable() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProducts] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    setError(null);
    try {
        console.log("fetching session details..");
        const authData = JSON.stringify(localStorage.getItem('token'));
        console.log("authData:", authData);

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
      const response = await axios.get(`http://localhost:3000/api/videos/finalcomment`, config);
      setProducts(response.data);
      console.log(product);

      }else{
        navigate('/')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.'); // Set error message
    }
  };

  const filterKeys = ['_id', 'createdTime', 'CreatedData', '__v'];

  const handleEdit = (videoId) => {
    navigate(`/reportsdownload/${videoId}`);
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
      const cleanedPart = desiredPart.replace(/^\d+-/, '');
      const videourl = `/videos/${cleanedPart}`;
      console.log('Video URL:', videourl);
      return videourl;
    //}
  };

//   const handleUrlImage = (inputurl) => {
//       const url = inputurl.replace(/\\/g, '/');
//       const desiredPart = url.split('/').pop();
//       const cleanedPart = desiredPart.replace(/^\d+-/, '');
//       const imageurl = `/${ cleanedPart}`;
//       console.log('Image URL:',imageurl);
//       return imageurl;
//   }

  return (
    <div className='w-full sm:text-sm sm:p-2'>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Product & Brand Name 
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Uploader
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Video
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-lg font-medium text-black uppercase tracking-wider">
                Reports
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          
            {product.map((product, index) => (
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
                  {product.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                  {product.createdIn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-900">
                  <div className="text-center">
                    <button
                      className='text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                      onClick={() => handleEdit(product._id)}>Download Reports</button>
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
    </div>
  );
}
