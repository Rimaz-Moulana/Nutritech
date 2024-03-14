import React from 'react';

export default function dropdown({ value,id,name, onChange}) {
  const optionsArray = [
    { value: 'Confectionery:', label: 'Confectionery:' },
    { value: 'Fine Bakery Wares', label: 'Fine Bakery Wares' },
    { value: 'Bread and Ordinary Bakery Wares', label: 'Bread and Ordinary Bakery Wares' },
    { value: 'Cereals', label: 'Cereals' },
    { value: 'Ready-to-eat Savouries', label: 'Ready-to-eat Savouries' },
    { value: 'Beverages', label: 'Beverages' },
    { value: 'Frozen dairy based desserts and edible ices', label: 'Frozen dairy based desserts and edible ices' },
    { value: 'Curded dairy based desserts', label: 'Curded dairy based desserts' },
    { value: 'Cheese and analogues', label: 'Cheese and analogues' },
    { value: 'Composite foods', label: 'Composite foods' },
    { value: 'Fats and oils, and fat emulsions', label: 'Fats and oils, and fat emulsions' },
    { value: 'Pasta and noodles and like products', label: 'Pasta and noodles and like products' },
    { value: 'Fresh and frozen meat, poultry, game, fish and seafood products', label: 'Fresh and frozen meat, poultry, game, fish and seafood products' },
    { value: 'Processed meat, poultry, game, fish and fish products', label: 'Processed meat, poultry, game, fish and fish products' },
    { value: 'Fresh and frozen fruits and vegetables,and legumes', label: 'Fresh and frozen fruits and vegetables,and legumes' },
    { value: 'Processed fruits and vegetables', label: 'Processed fruits and vegetables' },
    { value: 'Solid-form soybean Products', label: 'Solid-form soybean Products' },
    { value: 'Sauces, dips, and dressings', label: 'Sauces, dips, and dressings' },
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
            <option selected>Product Category</option>
            
            {optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
