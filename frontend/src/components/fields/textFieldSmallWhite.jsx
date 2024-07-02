import React from 'react'

export default function textFieldSmallWhite({value, id, name , onChange}) {
  return (
    <div className='py-1'>
    <input
        value = {value}
        id = {id}
        name = {name}
        onChange={onChange}
        className="shadow appearance-none border rounded w-[90%] h-8 py-0 px-10 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
        placeholder="" />
    </div>
    
  )
}
