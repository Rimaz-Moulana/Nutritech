import React from 'react'

export default function textfield({ placeholder, onChange }) {
  return (
    <div className="p-2">
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                className="shadow appearance-none border placeholder-black rounded w-[70%] h-8 py-0 px-5 bg-[#BDC69A]  text-black  focus:outline-none focus:shadow-outline"
                 />
        </div>
  )
}
