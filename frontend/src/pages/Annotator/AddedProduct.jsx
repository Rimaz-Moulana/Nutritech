import React from 'react'
import AddNewProduct from '../../components/button/AddNewProductBtn'
import ProductBar from '../../components/fields/ProductBar'
import LogTable from '../../components/tables/LogTable'
import BlankPage from '../../components/theme/BlankPage'

export default function AddedProduct() {
  return (
    <div className='w-full h-screen overflow-x-hidden bg-[#E5EBD6]'>
    <BlankPage />
    <div className='inline-flex'>
    <h1 className="ml-4 sm:ml-40 mb-8 mt-24 text-xl font-semibold text-sidebarGreen">Previously added products</h1>
    <AddNewProduct />
    </div>
    <ProductBar />
    <LogTable />
    </div>
  )
}
