import React, { useState } from 'react';

// Assuming this component exists in your project
import TextFiledWhiteForm from '../../components/fields/TextFieldWhiteForm';

function UploadForm({handleFormChange}) {
  

  return (
    
    <div className='flex-inline mt-12 md:w-1/2 ml-4'>
      <TextFiledWhiteForm type={1} name='brand' onChange={handleFormChange} />
      <TextFiledWhiteForm type={2} name='product' onChange={handleFormChange} />
      <TextFiledWhiteForm type={3} name='variation' onChange={handleFormChange} />
    </div>
  );
}

export default UploadForm;
