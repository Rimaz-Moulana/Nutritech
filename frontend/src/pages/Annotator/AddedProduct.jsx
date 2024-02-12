import React from 'react'
import AddNewProduct from '../../components/button/AddNewProductBtn'
import ProductBar from '../../components/fields/ProductBar'
import LogTable from '../../components/tables/LogTable'
import BlankPage from '../../components/theme/BlankPage'

export default function AddedProduct() {
  return (
    <div className='w-full h-screen overflow-x-auto xl:overflow-hidden bg-[#E5EBD6]'>
    <BlankPage />
    <div className='inline-flex ml-[11%] w-[80%]'>
    <h1 className="mb-8 mt-24 text-3xl font-semibold text-sidebarGreen">Product</h1>
    <AddNewProduct />
    </div>
    <ProductBar />
    <LogTable />
    </div>
  )
}
