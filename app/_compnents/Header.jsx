'use client'
import React from 'react'
import Link from 'next/link';
export default function Header() {
  return (
    <div className='flex justify-between border-b-2 text-lg px-16 py-4'>
      <h1 className='font-bold text-l tracking-wider'><Link href="/">Home</Link></h1>
      <ul className="flex justify-evenly align-middle w-[30%]">
        <li><Link href="/stores">Stores</Link></li>
        <li><Link href="aboutus">About Us</Link></li>
        <li><Link href="/contectus">Contect Us</Link></li>
      </ul>
      <div>
      login
      </div>
    </div>
  )
}
