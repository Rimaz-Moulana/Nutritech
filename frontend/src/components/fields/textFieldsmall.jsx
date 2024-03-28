import React from 'react'

export default function textFieldsmall({value, id, name , onChange}) {
  return (
    
    <div className='py-1'>
        <input
                value = {value}
                id = {id}
                name = {name}
                onChange={onChange}
                className="shadow appearance-none border rounded w-[90%] h-8 py-0 px-3 bg-[#BDC69A]  text-black leading-tight focus:outline-none focus:shadow-outline"
                placeholder="" />
    </div>
         
  )
}
