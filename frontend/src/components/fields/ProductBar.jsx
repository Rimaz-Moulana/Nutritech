import React from 'react'
import { default as LastProductBtn, default as UpdateProductBtn } from '../../components/button/ProductBarBtnUpdate'
import AllProductBtn from '../button/ProductBarButtonAll'

export default function ProductBar() {
  return (
    <div className='  w-[80%] lg:ml-72 sm:ml-20 md:ml-[200px] py-2'>
        <div className='w-[100%] justify-center px-2 flex py-4 text-sidebarGreer border rounded h-[80px] bg-white '>
         <span className='text-left w-[60%] font-bold text-2xl text-black'>Previously added products</span>
         <div className='inline-flex w-[40%] float-right justify-end '>
         <AllProductBtn /> 
         <UpdateProductBtn />
         <LastProductBtn />
         </div>
       
        </div>
        
    </div>
  )
}
