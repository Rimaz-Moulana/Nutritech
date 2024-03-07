import axios from 'axios';
import React, { useState } from 'react';
import Image from '../../assets/Images/NutriTech Logo-04 1.png';
import Image1 from '../../assets/images/login_imag.jpeg';


export default function login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/login', formData );
            console.log(res.data, formData)
            const { token, redirect } = res.data;
            console.log({ token, redirect })
            localStorage.setItem('token', token );
            // Redirect to dashboard or any other page after successful login
            window.location.href = redirect
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
  return (
<div className="md:flex ">
	<div
    //class="flex md:w-1/2 justify-center items-center"
		className="flex-inline md:w-1/2 justify-center items-center">
        <img  className='h-screen w-full' src={Image1} />
	</div>
    {/* //class="block md:w-1/2 h-screen justify-center items-center bg-gradient-to-br from-[#B8C294] to-white " */}
	<div className="space-y-4 md:w-1/2 h-screen justify-center items-center bg-gradient-to-br from-[#B8C294] to-white ">
        <img className="block pt-8 w-[40%] justify-center items-center ml-56 " src={Image} />
        <div className='block justify-center items-center ml-44'>
		<form className="bg-none align-content-center p-8" onSubmit={handleSubmit}>
        <div className='flex items-center justify-between mb-4'>
        <input
            type="email" name="email"
            className="shadow appearance-none border rounded w-[70%] py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none focus:shadow-outline"
            placeholder="Enter your username"  value={formData.email} onChange={handleChange} />
            
        </div>
        <div className='flex  mb-4'>
        <input type="password" id="password" name='password'
            className="shadow appearance-none border  bg-white rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"  value={formData.password} onChange={handleChange} />

        </div>
        <div>
        <div className='flex text-center'>
        <button type='submit' className="bg-[#3C6339]
             hover:bg-[#B8C294] text-white text-center w-[70%] py-2 px-4 font-bold rounded">
                Login
            </button>
        </div>
      </div>
			
		</form>
        </div>
	</div>
</div>
  )
}

