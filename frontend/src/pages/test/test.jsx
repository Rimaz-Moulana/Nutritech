import React from 'react'
import Astra1 from '../../assets/Images/astra1.png'
import Astra2 from '../../assets/Images/astra2.png'
import Astra3 from '../../assets/Images/astra3.png'
import Astra4 from '../../assets/Images/astra4.png'
import Loginbutton from '../../components/button/Loginbutton'
import DropDown from '../../components/fields/dropdown'
import DropDownWhite from '../../components/fields/dropdownWhite'
import TextFiledsmallWhite from '../../components/fields/textFieldSmallWhite'
import TextFiledWhite from '../../components/fields/textFieldWhite'
import TextFiledWhite2 from '../../components/fields/textFieldWhite2'
import TextFiledsmall from '../../components/fields/textFieldsmall'
import TextFiled from '../../components/fields/textfield'
import BlankPage from '../../components/theme/BlankPage'

export default function test() {
  return (
    <div className='w-full h-full overflow-x-hidden bg-[#E5EBD6]'>
        <BlankPage />
        <h1 className="ml-4 sm:ml-20 mb-8 mt-24 text-5xl font-semibold text-sidebarGreen">Product Deatils</h1>
        <div className='md:flex ml-5 relative'>
            <div className='flex-inline mt-4 md:w-1/2 ml-10'>
                <TextFiled />
                <TextFiled />
                <TextFiled />
                <TextFiled />
                <TextFiled />
                <TextFiled />
                <DropDown />
            <div className=''>
                <TextFiledWhite />
                <DropDownWhite />
                <DropDownWhite />
                <DropDownWhite />
                <TextFiledWhite />
                <TextFiledWhite />
                <DropDownWhite />
                <DropDownWhite />
                <TextFiledWhite />
                <TextFiledWhite />
                <TextFiledWhite />
                <TextFiledWhite />
                <div className='p-2'>
                    <input
                            type="text" id="username"
                            className="shadow appearance-none border rounded w-[60%] h-20 py-2 px-5 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your username" />
                </div>
            </div>
            </div>
            <div className='flex-inline mt-4 md:w-1/2'>
            <div className='inline-block'>
                <img className='inline-block px-5' src={Astra1} />
                <img className='inline-block px-5' src={Astra2} />
                <img className='inline-block px-5' src={Astra3} />
                <img className='inline-block px-5' src={Astra4} />
            </div>
            <div className='ml-52'>
            <label className='inline-block pt-5 text-2xl font-semibold'>Per 100g/ml</label>
            <label className='inline-block px-32 pt-5 text-2xl font-semibold'>Per Serving</label>
            </div>
                <div className='grid float-start gap-0 grid-cols-3 p-3'>
                <label className='inline-block py-1 text-lg font-semibold' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-lg font-semibold' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1  text-lg font-semibold' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-lg font-semibold' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-lg font-semibold' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-lg font-semibold' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1  text-lg font-semibold' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-lg font-semibold' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1  text-lg font-semibold' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-lg font-semibold' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                </div>
                <div className='grid float-start gap-0 grid-cols-2 w-full p-2 sm:w-full'>
                <label className='inline-block text-justify ml-8 py-3 text-lg font-semibold' >WHO_WPRO_foodcode Product</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3  text-lg font-semibold' >WHO_WPRO_permitted</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3  text-lg font-semibold' >WHO_WPRO_permitted Remark</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3  text-lg font-semibold' >WHO_SEARO_foodcode_Product</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3  text-lg font-semibold' >WHO_SEARO_permitted</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3 text-lg font-semibold' >WHO_SEARO_permitted Remark</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3  text-lg font-semibold' >SL food Code</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3  text-lg font-semibold' >SL_permitted</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3 text-lg font-semibold' >SL_foodcode__permitted Remark</label>
                <TextFiledWhite2 />
                </div>
            </div>
        </div>
        <div className='flex-inline py-10 '>
            <div className='inline-block w-44'>
                <Loginbutton />
            </div>
            <div className='inline-block w-44'>
                <Loginbutton />
            </div>
            <div className='inline-block w-44'>
                <Loginbutton />
            </div>
        
        </div>
    </div>
  )
}
