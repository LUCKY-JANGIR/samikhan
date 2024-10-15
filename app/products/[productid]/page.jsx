"use client"


import Cards from "@/app/_compnents/Cards";
import { usePathname } from "@/models/node_modules/next/navigation";
import { useState, useEffect } from "react"; 
export default function ProductsPage() {
  const [product, setProduct] = useState([]);
  let pathname = usePathname()

  const id= pathname.split('/')[2]
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products/?id=${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <>
      <Cards url="/" name={product.name} description={product.description} price={product.price} image={product.image}/>

      </>
    
            </>
  );
}
