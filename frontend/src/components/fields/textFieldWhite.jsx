import React from 'react'

export default function textFieldWhite({placeholder,onChange,name,id,value}) {
  return (
    <div className='p-2'>
         <input
                
                value = {value}
                id = {id}
                name = {name}
                onChange={onChange}
                className="shadow appearance-none border rounded w-[70%] h-8 py-0 px-5 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder={placeholder}
                 />
    </div>
  )
}
