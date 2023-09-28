import React from 'react'
import Link from 'next/link'
export default function Nab_bar(){
  return (
    <>
    <div style={{maxHeight:600 }} className="flex flex-col  items-center mt-24 h-96">
        <ul className="uppercase ">
            <li className='text-white pb-4 '>Dashboard</li>
            <li className='text-white pb-4'><Link href={"/admin/product"}>Product</Link> </li>
            <li className='text-white pb-4'>User</li>
            <li className='text-white pb-4'>Cart</li>
        </ul>
    </div>
    </>
  )
}
