import React from 'react';

export default function dropdown({ value,id,name, onChange1}) {
    // const [size,setSize] = useState('');
    // const [count,setCount] = useState(0);

    
    // onChange(count+"_"+size)



  const optionsArray = [
    { value: 'grams', label: 'grams' },
    { value: 'kilograms', label: 'kilograms' },
    { value: 'milli grams', label: 'milli grams' }

  ];
  
  return (
    
        <select
        id={id} // Use the provided id
        name={name} // Use the provided name
        className="border rounded w-[45%] h-8 py-0 px-3 bg-[#ffffff] text-gray-600 dark:bg-gray-700"
        value={value} // Set the selected value
        onChange={ onChange1} // Handle changes
      >
            <option className='' selected>Unit(Required)</option>
            
            {optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
  )
}
