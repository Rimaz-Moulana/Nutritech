import React from 'react'
import UpdateProductBtn from '../../components/button/ProductBarBtnUpdate'
import LastProductBtn from '../button/ProductBarBtnLast'
import AllProductBtn from '../button/ProductBarButtonAll'

export default function ProductBar({ handleFilter }) {
  return (
    <div className='  w-[99%] lg:ml-[0.5%] sm:ml-20 md:ml-[200px] py-2'>
        <div className='w-[100%] justify-center px-2 flex py-4 text-sidebarGreer border rounded h-[80px] bg-white '>
         <span className='text-left w-[60%] font-bold text-2xl text-black'>Previously added products</span>
         <div className='inline-flex w-[40%] float-right justify-end '>
         <AllProductBtn onClick={() => handleFilter('all')} /> 
          <UpdateProductBtn onClick={() => handleFilter('updated')} />
          <LastProductBtn onClick={() => handleFilter('last')} />
         </div>
       
        </div>
        
    </div>
  )
}
