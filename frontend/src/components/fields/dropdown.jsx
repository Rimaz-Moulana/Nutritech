import React from 'react';

export default function dropdown({ value,id,name, onChange}) {
  const optionsArray = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'FR', label: 'France' },
    { value: 'DE', label: 'Germany' },
  ];
  
  return (
    <div className='p-2'>
        <select
        id={id} // Use the provided id
        name={name} // Use the provided name
        className="border rounded w-[70%] h-8 py-0 px-3 bg-[#BDC69A] text-gray-600 dark:bg-gray-700"
        value={value} // Set the selected value
        onChange={onChange} // Handle changes
      >
            <option selected>Variation</option>
            
            {optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
