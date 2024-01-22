import React from 'react'

export default function textFieldWhite() {
  return (
    <div className='p-2'>
         <input
                type="text" id="username"
                className="shadow appearance-none border rounded w-[70%] h-8 py-0 px-5 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your username" />
    </div>
  )
}
