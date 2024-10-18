'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

export default function Header(props) {
  const user=props.islogin;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      // Call the logout API
      const res = await fetch('/api/auth/logout', { method: 'POST' });

      if (res.ok) {
        // Optionally, redirect to the login page or home
        window.location.href = '/';
      } else {
        console.error('Logout failed');
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error('Error logging out:', error);
      setIsLoggingOut(false);
    }
  };
  return (
    <div className='flex justify-between border-b-2 text-lg px-16 py-4'>
      <h1 className='font-bold text-l tracking-wider'><Link href="/">Home</Link></h1>
      <ul className="flex justify-evenly align-middle w-[30%]">
        <li><Link href="/stores">Stores</Link></li>
        <li><Link href="aboutus">About Us</Link></li>
        <li><Link href="/contectus">Contect Us</Link></li>
      </ul>
      <div>{user ? (
              // If user is logged in, display the profile image
              <>
              <Link href="/profile"><img
                src={user.profileImage || '/defaultImg.webp'} // fallback to default if no image
                alt="Profile"
                className="profile-image"
                style={{ width: '40px', borderRadius: '50%' }}
              /></Link>
              <button onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Logging Out...' : 'Logout'}
            </button>
              </>
            ) : (
              // If user is not logged in, display a login link or button
              <Link href="/login">Login</Link>
            )}
      </div>
    </div>
  )
}
