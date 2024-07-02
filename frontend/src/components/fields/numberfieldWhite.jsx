import React from 'react';

export default function dropdown({ value,id,name,onChange}) {
   
  return (
    
      <input
                type="number"
                value = {value}
                id = {id}
                name = {name}
                onChange={onChange}
                placeholder='Size'
                className="shadow appearance-none border placeholder-gray-600 rounded w-[25%] position-fixed h-8 py-0 px-2 bg-[#ffffff]  text-black  focus:outline-none focus:shadow-outline"
                 />
  )
}
