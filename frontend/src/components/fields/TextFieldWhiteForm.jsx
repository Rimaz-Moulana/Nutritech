import React from 'react';

export default function TextFieldWhiteForm({ type }) {
  return (
    <div className='p-2 sm:mr-4'>
      <input
        className="shadow p-2 appearance-none border rounded w-full h-8 py-2 bg-[#ffffff] text-black leading-tight focus:outline-none focus:shadow-outline"
        placeholder={type === 1 ? 'Brand Name' : type === 2 ? 'Product' : 'Variation of the product'}
      />
    </div>
  );
}
