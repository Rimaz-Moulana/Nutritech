import React from 'react'
import { default as LastProductBtn, default as UpdateProductBtn } from '../../components/button/ProductBarBtnUpdate'
import AllProductBtn from '../button/ProductBarButtonAll'

export default function ProductBar() {
  return (
    <div className='  w-[80%] lg:ml-72 sm:ml-20 md:ml-[200px] py-10'>
        <div className='flex text-2xl px-5 py-3 text-sidebarGreer border rounded h-[60px] bg-white'>
         <span className='text-left  font-semibold'>Product</span>
         <div className='inline-flex lg:ml-[925px] md:ml-[200px] sm:ml-[50px]'>
         <AllProductBtn />
         <UpdateProductBtn />
         <LastProductBtn />
         </div>
       
        </div>
        
    </div>
  )
}
