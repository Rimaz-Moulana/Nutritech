import React from 'react'
import TextFiledWhiteForm from '../../components/fields/TextFieldWhiteForm'

function UploadForm() {
  return (
      <div className='flex-inline mt-12 md:w-1/2 ml-4'>
                <TextFiledWhiteForm type={1} />
                <TextFiledWhiteForm type={2}/>
                <TextFiledWhiteForm type={3}/>
    </div>
  )
}

export default UploadForm
