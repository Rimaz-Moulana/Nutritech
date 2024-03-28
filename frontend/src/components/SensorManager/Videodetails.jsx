import React from 'react'


export default function Videodetails({type}) {
  return (
    <div className=' p-2'>
        <div className='mt-8 flex'>
        {type==='BrandName' && (
            <><p>Brand Name :</p>
            <input
                      type="text" id="username"
                      className="shadow appearance- border rounded w-2/8 h-8 py-0 px-5 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
                     /></>
        )}
        </div>
        <div className='mt-8 flex'>
        {type==='Product' && (
            <><p>Product :</p>
            <input
            type="text" id="username"
            className="shadow appearance-none border rounded w-2/8 h-8 py-0 px-5 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
            /></>
        )}
        </div>
        <div className='mt-8 flex'>
        {type==='Product' && (
            <><p>Variation :</p>
            <input
            type="text" id="username"
            className="shadow appearance-none border rounded w-2/8 h-8 py-0 px-5 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
            />
            </>
        )}
        </div>
        
        
         
    </div>
  )
}
