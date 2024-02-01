import React from 'react'
// import TextFiledWhitehtmlForm from '../../components/fields/TextFieldWhitehtmlForm'

function UploadhtmlForm({ formData, handleFormChange }) {
  return (
      <div className='flex-inline mt-12 md:w-1/2 ml-0'>

  <form className="max-w-sm mx-auto">
  <div className="mb-5">

    <input type="brandname" id="brandname" name="brandname" value={formData.brandname} onChange={handleFormChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Brand Name" required/>
  </div>
  <div className="mb-5">
    <input type="product" id="product" name="product" value={formData.product} onChange={handleFormChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"placeholder="Product" required/>
  </div>
  <div className="mb-5">
    <input type="variation" id="variation" name="variation" value={formData.variation} onChange={handleFormChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"placeholder="Variation" required/>
  </div>
</form>
    </div>
  )
}

export default UploadhtmlForm
