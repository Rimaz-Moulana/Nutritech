import React from 'react';

export default function dropdownWhite({value, id, name , onChange, defOptions}) {
  const optionsArray = [
    { value: 'United States', label: 'United States' },
    { value: 'Canada', label: 'Canada' },
    { value: 'France', label: 'France' },
    { value: 'Germany', label: 'Germany' },
  ];
  
  return (
    <div className='p-2'>
        <select
        id={id} // Use the provided id
        name={name} // Use the provided name
        className="border rounded w-[70%] h-8 py-0 px-3 bg-white text-gray-400 dark:bg-gray-700"
        value={value} // Set the selected value
        onChange={onChange} // Handle changes
      >
            <option value={defOptions} selected>{defOptions}</option>
            {optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

