import React from 'react';
import Image from '../assets/images/NutriTech Logo-04 1.png';
import Image1 from '../assets/images/login_imag.jpeg';
import Loginbutton from '../components/button/Loginbutton';

export default function login() {
  return (
<div className="md:flex ">
	<div
    //class="flex md:w-1/2 justify-center items-center"
		className="flex-inline md:w-1/2 justify-center items-cente">
        <img  className='h-screen w-full' src={Image1} /> 
	</div>
    {/* //class="block md:w-1/2 h-screen justify-center items-center bg-gradient-to-br from-[#B8C294] to-white " */}
	<div className="space-y-4 md:w-1/2 h-screen justify-center items-center bg-gradient-to-br from-[#B8C294] to-white ">
        <img className="block pt-8 w-[40%] justify-center items-center ml-56 " src={Image} />
        <div className='block justify-center items-center ml-44'>
		<form className="bg-none align-content-center p-8">
        <div className='flex items-center justify-between mb-4'>
        <input
            type="text" id="username"
            className="shadow appearance-none border rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your username" />
        </div>
        <div className='flex  mb-4'>
        <input type="password" id="password"
            className="shadow appearance-none border rounded w-[70%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password" />
        </div>
        <div><Loginbutton/></div>
			
		</form>
        </div>
	</div>
</div>
  )
}

