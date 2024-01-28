import React from 'react'
import { default as LastProductBtn, default as UpdateProductBtn } from '../../components/button/ProductBarBtnUpdate'
import AllProductBtn from '../button/ProductBarButtonAll'

export default function ProductBar() {
  return (
    <div className='  w-[80%] lg:ml-60 sm:ml-20 md:ml-[200px] py-2'>
        <div className='flex px-2 py-2 text-sidebarGreer border rounded h-[40px] bg-white'>
         <span className='text-left  font-semibold'>Product</span>
         <div className='inline-flex lg:ml-[708px] md:ml-[200px] sm:ml-[50px]'>
         <AllProductBtn />
         <UpdateProductBtn />
         <LastProductBtn />
         </div>
       
        </div>
        
    </div>
  )
}
