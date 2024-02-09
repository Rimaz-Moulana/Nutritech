import React from 'react';

export default function TextFieldWhiteForm({ type,onChange,name }) {
  return (
    <div className='p-2 sm:mr-4'>
      <input onChange={onChange} name={name}
        className="shadow p-2 appearance-none border rounded w-full h-8 py-2 bg-[#ffffff] text-black leading-tight focus:outline-none focus:shadow-outline"
        placeholder={type === 1 ? 'Brand' : type === 2 ? 'Product' : 'Variation'}
      />
    </div>
  );
}
