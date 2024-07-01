// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Table from '../../components/tables/TableProduct';
// import BlankPage from '../../components/theme/BlankPage';

// export default function AddedProduct() {
//   const {product,brand,size,unit} = useParams();
//   const [allProducts, setAllProducts] = useState([]);
//   //const [filteredProducts, setFilteredProducts] = useState([]);
//   const {type} = useParams()

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/product/${product}/${brand}/${size}/${unit}`);
//       setAllProducts(response.data);
//       //setFilteredProducts(response.data); // Initially set filtered products to all products
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // const handleFilter = (filter) => {
//   //   if (filter === 'all') {
//   //     setFilteredProducts(allProducts);
//   //   } else if (filter === 'updated') {
//   //     // Filter updated products based on lastUpdatedTime
//   //     const updatedProducts = allProducts.filter(product => product.lastUpdatedTime !== undefined);
//   //     setFilteredProducts(updatedProducts);
//   //   } else if (filter === 'lastDay') {
//   //     // Filter products updated within the last day
//   //     const lastDayProducts = allProducts.filter(product => {
//   //       const lastDay = new Date();
//   //       lastDay.setDate(lastDay.getDate() - 1);
//   //       return new Date(product.lastUpdatedTime) > lastDay;
//   //     });
//   //     setFilteredProducts(lastDayProducts);
//   //   } else if (filter === 'lastWeek') {
//   //     // Filter products updated within the last week
//   //     const lastWeekProducts = allProducts.filter(product => {
//   //       const lastWeek = new Date();
//   //       lastWeek.setDate(lastWeek.getDate() - 7);
//   //       return new Date(product.lastUpdatedTime) > lastWeek;
//   //     });
//   //     setFilteredProducts(lastWeekProducts);
//   //   }
//   //};

//   return (
//     <div className='w-full min-h-screen overflow-x-auto xl:overflow-hidden bg-backgroundGreen place-items-center'>

//       <BlankPage type="annotator" />
//       <div className='inline-flex ml-[11%] w-[80%]'>
//         <h1 className="mb-8 mt-24 text-3xl font-semibold text-sidebarGreen">Existing Product Details</h1>
//       </div>
      
//       <div className='w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64'>
//         <div className=''>
//           <Table  />
//         </div>
//       </div>    

//     <BlankPage type={type} />
//     {/* <div className='inline-flex ml-[11%] w-[80%]'>
//     <h1 className="mb-8 mt-24 text-3xl font-semibold text-sidebarGreen">Product</h1>
//     <AddNewProduct />

//     </div> */}
//     </div>
//   );
// }

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Table from '../../components/tables/TableProduct';
import BlankPage from '../../components/theme/BlankPage';
import API from '../../config/config';

export default function AddedProduct() {
  const { product, brand, size,unit } = useParams();
  const {type} = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
       try {
          // const email  = localStorage.getItem('email');
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
          const response = await axios.get(`${API}/api/users/getUser/${email}`, config);
          // console.log("response",response); // Logging the response data directly
          setUserData(response.data); // Setting the response data to the state

          }else{
            navigate('/')
          }
       } catch (error) {
          console.error('Error fetching user:', error);
          // Handle error (e.g., set error state, show error message)
       }
    };
  
    fetchUser();
}, []);

  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, [product, brand, size,unit]); // Added dependency array for useEffect

  const fetchData = async () => {
    setIsLoading(true); // Set loading state to true when fetching data
    setError(null); // Reset error state before fetching data
    try {
      const token = localStorage.getItem('token');
        console.log("token:", token);

      setTimeout(() => {
        // Remove token from local storage after 5 seconds
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }, 7200000); // 2hours


      if (token) {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        };
      const response = await axios.get(`${API}/api/product/view/${size}/${product}/${brand}` , config);
      const result = response.data.filter(product => product.unit === unit); 
      setAllProducts(result);
      console.log(response.data);
      console.log(allProducts);

      }else{
        navigate('/')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.'); // Set error message
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  return (
    <div className='w-full min-h-screen overflow-x-auto xl:overflow-hidden bg-backgroundGreen place-items-center'>

      <BlankPage type={userData.role} />
      <div className='inline-flex ml-[11%] w-[80%]'>
        <h1 className="mb-8 mt-24 text-3xl font-semibold text-sidebarGreen">Existing Product Details</h1>
        
      </div>
      
      <div className='w-full mb-10 sm:w-3/4 ml-0 h-full z-10 sm:ml-64'>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Table Products={allProducts} /> // Pass fetched products as props to Table component
        )}
        
      </div>

      {/* <BlankPage type={type} /> */}
    </div>
  );
}
