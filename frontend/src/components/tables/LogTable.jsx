import React from 'react'
import Model from '../button/ProductDetailsModel'

export default function LogTable() {
  return (
    <div className='w-[100%] lg:ml-72 sm:ml-20 md:ml-40 justify-center justify-items-center'>
        <table className="min-w-[80%] justify-center table-auto divide-y  divide-gray-200">
                <thead className="bg-gray-50 text-center">
                    <tr>
                    <th scope="col" className="px-6 py-3  text-lg font-medium text-black uppercase tracking-wider">
                        Product Name
                    </th>
                    <th scope="col" className="px-6 py-3  text-lg font-medium text-black uppercase tracking-wider">
                        User Type
                    </th>
                    <th scope="col" className="px-6 py-3  text-lg font-medium text-black uppercase tracking-wider">
                        Time
                    </th>
                    <th scope="col" className="px-6 py-3  text-lg font-medium text-black uppercase tracking-wider">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3  text-lg font-medium text-black uppercase tracking-wider">
                        Product Details
                    </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">Admin</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">johndoe</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">11:35 AM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">2024-01-12</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900"> <Model /></div>
                    </td>
                    </tr>
                    <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">Admin</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">johndoe</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">11:35 AM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">2024-01-12</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900"> <Model /></div>
                    </td>
                    </tr>
                    <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">Admin</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">johndoe</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">11:35 AM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900">2024-01-12</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className=" text-gray-900"> <Model /></div>
                    </td>
                    </tr>
                    </tbody>
            </table>

    </div>
  )
}
