"use client"
import Storeslist from '../_compnents/Storeslist';
import { usePathname } from 'next/navigation'
export default function StoresLayout({ children }) {
  let pathname = usePathname()

  const isStoresIndex = pathname === '/stores';

    return (
      <div className="stores-layout flex flex-row ">
        {!isStoresIndex && (
        <Storeslist/>
      )}
        <div className="store-content w-full">
          {children}
        </div>
      </div> 
    );

  }


