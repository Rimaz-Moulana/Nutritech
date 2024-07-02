import React from 'react';

export default function dropdown({ value,id,name, onChange}) {
  const optionsArray = [
    { value: 'Confectionery', label: 'Confectionery' },
    { value: 'Fine Bakery Wares', label: 'Fine Bakery Wares' },
    { value: 'Bread and Ordinary Bakery Wares', label: 'Bread and Ordinary Bakery Wares' },
    { value: 'Cereals', label: 'Cereals' },
    { value: 'Potato,cereal or starch-based and animal based', label: 'Potato,cereal or starch-based and animal based' },
    { value: 'Processed nuts', label: 'Processed nuts' },
    { value: 'Fish-based', label: 'Fish-based' },
    { value: 'Juices', label: 'Juices' },
    { value: 'Milk and dairy based drinks', label: 'Milk and dairy based drinks' },
    { value: 'Water based flavoured drink', label: 'Water based flavoured drink' },
    { value: 'Coffee,coffee substitutes,tea, herbal infusions', label: ' Coffee,coffee substitutes,tea, herbal infusions' },
    { value: 'Cereal,grain, tree nut-based beverages', label: 'Cereal,grain, tree nut-based beverages' },
    { value: 'Frozen dairy based desserts and edible ices', label: 'Frozen dairy based desserts and edible ices' },
    { value: 'Curded dairy based desserts', label: 'Curded dairy based desserts' },
    { value: 'Cheese and analogues', label: 'Cheese and analogues' },
    { value: 'Composite foods', label: 'Composite foods' },
    { value: 'Fats and oils, and fat emulsions', label: 'Fats and oils, and fat emulsions' },
    { value: 'Pasta and noodles and like products', label: 'Pasta and noodles and like products' },
    { value: 'Fresh and frozen meat, poultry, game, fish and seafood products', label: 'Fresh and frozen meat, poultry, game, fish and seafood products' },
    { value: 'Processed meat, poultry and game Products', label: 'Processed meat, poultry and game Products' },
    { value: 'Processed fish and seafood products', label: 'Processed fish and seafood products' },
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
        className="border rounded w-[100%] h-8 py-0 px-3 bg-[#ffffff] text-gray-600 dark:bg-gray-700"
        value={value} // Set the selected value
        onChange={onChange} // Handle changes
      >
            <option className='' selected>Product Category</option>
            
            {optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
