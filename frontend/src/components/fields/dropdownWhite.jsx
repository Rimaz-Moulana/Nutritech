import React from 'react'

export default function dropdownWhite() {
  return (
    <div className='p-2'>
        <select id="countries" className=" border rounded w-[70%] h-8 py-0 px-3 bg-[#ffffff] text-black dark:bg-gray-700 ">
            <option selected>Variation</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>
    </div>
  )
}