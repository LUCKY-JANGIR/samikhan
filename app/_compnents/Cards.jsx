import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Cards(props) {

  return (
   <Link href={`/products/${props.url}`}  className="w-[18vw] h-[55vh] mx-[1%] p-[1%] my-[1%] border-2 flex flex-col items-center"> 
     
   <div className="relative w-full h-[70%]">
     <Image
       src={props.image}
       alt="product img"
       layout="fill" 
       objectFit="contain" 
       className="object-center" 
     />
   </div>

   <div className="mt-2 text-center">
     <h1 className="text-lg font-semibold">{props.name}</h1>
     <span className="block text-sm">{props.description}</span> <br />
     <span className="block text-sm font-bold">Price: ${props.price}</span>
   </div>
 </Link>
  );
}
