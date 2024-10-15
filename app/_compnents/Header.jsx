'use client'
import Link from '@/models/node_modules/next/link'
import React from 'react'
import { signIn, signOut, useSession } from '../../../models/node_modules/next-auth/src/react';
import Image from '@/models/node_modules/next/image';
export default function Header() {
  const { data: session } = useSession();
  return (
    <div className='flex justify-between border-b-2 text-lg px-16 py-4'>
      <h1 className='font-bold text-l tracking-wider'><Link href="/">Home</Link></h1>
      <ul className="flex justify-evenly align-middle w-[30%]">
        <li><Link href="/stores">Stores</Link></li>
        <li><Link href="aboutus">About Us</Link></li>
        <li><Link href="/contectus">Contect Us</Link></li>
      </ul>
      <div>
      {session ? (
          <>
           
              {/* Display user's profile image or initials */}
              <Link href="/profile"><Image
                src={session.user.image} // Profile image URL
                alt={session.user.name} // User name for accessibility
                width={40} // Adjust width as needed
                height={40} // Adjust height as needed
                style={{ borderRadius: '50%' }} // Circular image
              /></Link>
              <h1>{session.user.name}</h1>
              <button onClick={() => signOut()}>Sign Out</button>
           
          </>
        ) : (
            <Link href="/auth/signin">Sign In</Link>
        )}
      </div>
    </div>
  )
}
