import React from 'react'
import TextFiledWhiteForm from '../../components/fields/TextFieldWhiteForm'

function UploadForm({handleChange}) {
  return (
      <div className='flex-inline mt-12 md:w-1/2 ml-4'>
                <TextFiledWhiteForm type={1} name='brand' onChange={handleChange} />
                <TextFiledWhiteForm type={2} name='product' onChange={handleChange} />
                <TextFiledWhiteForm type={3} name='variation' onChange={handleChange} />
    </div>
  )
}

export default UploadForm
