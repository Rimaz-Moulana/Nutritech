
import React from 'react';
import TextFiledWhiteForm from '../fields/TextFieldWhiteForm';
import Dropdown from '../fields/dropDownlCatoegryWhite';
import DropdownSize from '../fields/dropdownSizeWhite';
import Unit from '../fields/numberfieldWhite';

function UploadForm({handleChange}) {
  return (
      <div className='flex-inline mt-12 md:w-1/2 ml-4'>
                <TextFiledWhiteForm type={1} name='brand' onChange={handleChange} />
                <TextFiledWhiteForm type={2} name='product' onChange={handleChange} />
                <div className='p-2 sm:mr-4 w-[98.%]'>
                <DropdownSize placeholder="Unit"  name='unit' onChange={handleChange}  />
                <Unit placeholder='Size' name='size' onChange={handleChange} />
                </div>
                <div className='sm:mr-4 w-[98%]p-2'>
                <Dropdown  placeholder="Product Category" name='category' onChange={handleChange} />
      </div>
</div>


)

}

export default UploadForm

