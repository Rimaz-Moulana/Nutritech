import React from 'react'

export default function textfield({ placeholder, onChange , value,  id , name }) {
  return (
    <div className="p-2">
            <input
                type="text"
                value = {value}
                id = {id}
                name = {name}
                onChange={onChange}
                placeholder={placeholder}
                className="shadow appearance-none border placeholder-gray-600 rounded w-[70%] h-8 py-0 px-5 bg-[#BDC69A]  text-black  focus:outline-none focus:shadow-outline"
                 />
        </div>
  )
}
