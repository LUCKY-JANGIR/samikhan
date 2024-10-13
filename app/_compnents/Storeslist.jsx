import React from 'react'
import Link from 'next/link';
import { useStores } from '../contexts/storeslistcontext';

export default function Storeslist() {
  const stores=useStores();
  return (
    <div className="size-full pl-3">
      <nav>
        <h1 className="text-lg font-semibold"><Link href="/stores">Stores</Link></h1>
        <ul>
          {stores.map(store => (
            <li key={store.id}>
              <Link className="m-3" href={`/stores/${store.category}`}>
                {store.name}
              </Link>
            </li>
          ))} 
        </ul>
      </nav>
    </div>
  )
}
