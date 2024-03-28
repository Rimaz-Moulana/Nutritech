import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
  };

  const closeDetailsModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Product Table</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>User Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>Product Details</th>
          </tr>
        </thead>
        <tbody>
          {console.log(products[0])}
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.productName}</td>
              <td>{product.brand}</td>
              <td>{product.CreatedData}</td>
              <td>{product.createdTime}</td>
              <td>
                <button onClick={() => openDetailsModal(product)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying product details */}
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={closeDetailsModal}>&times;</button>
            <h2>Product Details</h2>
            <ul>
              {Object.entries(selectedProduct).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
