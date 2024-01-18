import React from 'react'

export default function textFieldWhite() {
  return (
    <div className='p-2'>
         <input
                type="text" id="username"
                className="shadow appearance-none border rounded w-[60%] h-12 py-2 px-5 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your username" />
    </div>
  )
}
