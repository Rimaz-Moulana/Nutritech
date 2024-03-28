import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Buttons() {
  const navigate = useNavigate(); 
  const viewdetails= () => {
    navigate('/product');
  };
  const submit =(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/annotation",)
  }
  return (
    <div className='flex'>
        <button className="text-white bg-gradient-to-t from-buttonGreen to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 "onClick={submit}>Save</button>
        <button className="text-white bg-gradient-to-t from-buttonGreen  to-darkGreen hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-darkGreen dark:focus:ring-darkGreen shadow-lg shadow-darkGreen dark:shadow-lg dark:shadow-darkGreen font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={viewdetails}>View Product Details</button>
    </div>
  )
}

export default Buttons
