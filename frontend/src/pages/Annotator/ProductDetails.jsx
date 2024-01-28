import React from 'react'
import Astra1 from '../../assets/Images/astra1.png'
import Astra2 from '../../assets/Images/astra2.png'
import Astra3 from '../../assets/Images/astra3.png'
import Astra4 from '../../assets/Images/astra4.png'
import DropDown from '../../components/fields/dropdown'
import DropDownWhite from '../../components/fields/dropdownWhite'
import TextFiledsmallWhite from '../../components/fields/textFieldSmallWhite'
import TextFiledWhite from '../../components/fields/textFieldWhite'
import TextFiledWhite2 from '../../components/fields/textFieldWhite2'
import TextFiledsmall from '../../components/fields/textFieldsmall'
import TextFiled from '../../components/fields/textfield'
import Navbar from '../../components/navbar/Navbar'
import Annotatorsidebar from '../../components/sidebar/AnnotatorSideBar'

export default class test extends React.Component {
    render(){
  return (
    <div className='bg-backgroundGreen overflow-x-hidden'>
        <div className="w-2/8 fixed h-full hidden sm:flex flex-col"> {/* Show on screens larger than sm */}
        <Annotatorsidebar />
        </div>
        <div className="w-full sm:w-3/4 ml-0 sm:ml-64">
        <Navbar />
        </div>
        <h1 className="lg:ml-20 sm:ml-40 mb-8 mt-24 lg:mr-[750px] md:mr-50 sm:mr  text-3xl font-semibold text-sidebarGreen">Product Deatils</h1>
        <div className='ml-4 lg:inline-flex sm:flex'>
            <div className='mt-4 md:w-1/2 lg:ml-40 sm:ml-5'>
                <TextFiled placeholder="Product Name" />
                <TextFiled placeholder="Brand" />
                <TextFiled placeholder="Parent Company" />
                <TextFiled placeholder="Product Description" />
                <TextFiled placeholder="Product Category" />
                <TextFiled placeholder=""  />
                <TextFiled placeholder="" />
                <DropDown />
            <div className=''>
                <TextFiledWhite placeholder="Country of the product" />
                <DropDownWhite  />
                <DropDownWhite />
                <DropDownWhite />
                <TextFiledWhite placeholder="Vitamin"/>
                <TextFiledWhite placeholder="Mineral"/>
                <DropDownWhite />
                <DropDownWhite />
                <TextFiledWhite placeholder="Probiotics"/>
                <TextFiledWhite placeholder="Reconstituted method (Y/N/C)"/>
                <TextFiledWhite placeholder="Reconstituted total volume(ml)"/>
                <TextFiledWhite placeholder="Preparation instruction or other remarks(only if reconstituted method is 'Y' or 'C')"/>
                <div className='p-2'>
                    <input
                            type="text" id="username"
                            className="shadow appearance-none placeholder:block border rounded w-[70%] h-10 py-2 px-5 bg-[#ffffff]  text-black leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingredient as in the label (separete by comma)" />
                </div>
            </div>
            </div>
            <div className='flex-inline mt-4 md:w-1/2'>
            <div className='inline-block'>
                <img className='inline-block px-1 h-20 w-28' src={Astra1} />
                <img className='inline-block px-1 h-20 w-28' src={Astra2} />
                <img className='inline-block px-1 h-20 w-28' src={Astra3} />
                <img className='inline-block px-1 h-20 w-28' src={Astra4} />
            </div>
            <div className='text ml-64'>
            <label className='inline-block pt-5 text-xl '>Per 100g/ml</label>
            <label className='inline-block px-16 pt-5 text-xl '>Per Serving</label>
            </div>
                <div className='grid float-start gap-0 grid-cols-3 p-3'>
                <label className='inline-block py-1 text-justify ' >Energy(kcal)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1  text-justify' >Protein(g)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-justify ' >Total Fat(g)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-justify  ' >SFA(g)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-justify ' >Carbo(ga)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-justify ' >Sugars(g)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1  text-justify' >Salt(g)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1  text-justify ' >Sodium(g)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1 text-justify ' >Trans Fat(g)</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                <label className='inline-block py-1  text-justify ' >Ash</label>
                <TextFiledsmall />
                <TextFiledsmallWhite />
                </div>
                <div className='grid float-start gap-0 grid-cols-2 w-full p-2 sm:w-full'>
                <label className='inline-block text-justify ml-8 py-3  ' >WHO_WPRO_foodcode Product</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3   ' >WHO_WPRO_permitted</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3   ' >WHO_WPRO_permitted Remark</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3   ' >WHO_SEARO_foodcode_Product</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3   ' >WHO_SEARO_permitted</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3  ' >WHO_SEARO_permitted Remark</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3   ' >SL food Code</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3   ' >SL_permitted</label>
                <TextFiledWhite2 />
                <label className='inline-block text-justify ml-8 py-3  ' >SL_foodcode__permitted Remark</label>
                <TextFiledWhite2 />
                </div>
            </div>
        </div>
        <div className='flex-inline py-10 '>
            <div className='inline-block w-44'>
            <div className='flex text-center'>
                <button className="bg-[#3C6339]
                hover:bg-[#B8C294] text-white text-center w-[70%] py-2 px-4 font-bold rounded">
                    Cancel
                </button>
                </div>
            </div>
            <div className='inline-block w-44'>
            <div className='flex text-center'>
                <button className="bg-[#3C6339]
                hover:bg-[#B8C294] text-white text-center w-[70%] py-2 px-4 font-bold rounded">
                    Draft
                </button>
                </div>
            </div>
            <div className='inline-block w-44'>
            <div className='flex text-center'>
                <button className="bg-[#3C6339]
                hover:bg-[#B8C294] text-white text-center w-[70%] py-2 px-4 font-bold rounded">
                    Save
                </button>
                </div>
            </div>
        </div>
    </div>
  )
}
}