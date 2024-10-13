"use client"
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useStores } from '../contexts/storeslistcontext'



export default  function Stores() {
  const stores =  useStores();
  
  return (
    <div className='flex flex-col border-b-2 py-3 px-10'>
      <h1 className='uppercase self-center text-lg font-semibold mb-2'><Link href="/stores">Stores</Link></h1>
      <ul className='flex self-center justify-evenly gap-6 flex-wrap w-full my-3 '>
      {stores.map(store => (
            <li key={store.name}>
              <Link href={`/stores/${store.category}`}>
                {store.name}
              </Link>
            </li>
          ))} 
      </ul>
    </div>
  )

}
