import React from 'react'

export default function textFieldWhite2({value,id,name,onChange}) {
  return (
    <div className='p-2 sm:mr-4'>
    <input
                value = {value}
                id = {id}
                name = {name}
                onChange={onChange}
           className="shadow appearance-none border placeholder-black rounded w-[90%] h-8 py-2 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
           placeholder="" />
</div>
  )
}
